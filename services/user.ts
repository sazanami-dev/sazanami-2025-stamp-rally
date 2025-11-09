import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/types/schema/user";
import { User } from "@prisma/client";
import { DataNotFoundError, DataOperationError, DataUnknownError } from "@/types/error/data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrorCodesByType } from "@/types/const";

async function getUserById(userId: string) {
  let user: User | null = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while fetching user", {
        userNotice: "ユーザーの取得中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
  return user;
}

async function isUserExists(userId: string): Promise<boolean> {
  let exists = false;
  try {
    const count = await prisma.user.count({
      where: { id: userId },
    });
    exists = count > 0;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while checking user existence", {
        userNotice: "ユーザーの存在確認中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }

  return exists;
}

async function createUser(userData: CreateUser): Promise<User> {
  let newUser: User;
  try {
    if (!userData.id) {
      userData.id = crypto.getRandomValues(new Uint8Array(16)).join("");
    }
    newUser = await prisma.user.create({
      data: userData,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while creating user", {
        userNotice: "ユーザーの作成中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
  return newUser;
}

async function updateUser(userId: string, updateData: Partial<CreateUser>): Promise<User> {
  let updatedUser: User;
  try {
    updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while updating user", {
        userNotice: "ユーザーの更新中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
  return updatedUser;
}

function wrapPrismaKnownErrorHelper(error: unknown): never {
  if (error instanceof PrismaClientKnownRequestError) {
    if (PrismaErrorCodesByType.DataNotFound.includes(error.code)) {
      throw new DataNotFoundError("Data not found", {
        userNotice: "指定されたデータは存在しません。",
        errorCode: "DATA_NOT_FOUND",
      });
    } else if (PrismaErrorCodesByType.DataOperationFailed.includes(error.code)) {
      throw new DataOperationError("Data operation failed", {
        userNotice: "データ操作に失敗しました。",
        errorCode: "DATA_OPERATION_FAILED",
      });
    }
  }
  throw error;
}

export { getUserById, createUser, isUserExists, updateUser };
