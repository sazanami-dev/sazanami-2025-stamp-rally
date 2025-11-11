import { Category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrorCodesByType } from "@/types/const";
import { DataNotFoundError, DataOperationError, DataUnknownError } from "@/types/error/data";

export async function getAllCategories(): Promise<Category[]> {
  let categories: Category[] = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while fetching categories", {
        userNotice: "カテゴリ情報の取得中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
  return categories;
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
