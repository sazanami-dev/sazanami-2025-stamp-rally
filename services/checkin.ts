import { prisma } from "@/lib/prisma";
import Logger from "@/lib/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaErrorCodesByType } from "@/types/const";
import { DataNotFoundError, DataOperationError, DataUnknownError } from "@/types/error/data";

const logger = new Logger('checkin');

async function recordCheckIn(userId: string, checkpointId: string) {
  try {
    const checkin = await prisma.checkin.create({
      data: {
        userId,
        checkpointId,
      },
    });
    logger.success(`Check-in recorded: ${checkin.id}`, 'recordCheckIn');
    return checkin;
  } catch (error) {
    logger.error(`Failed to record check-in: ${(error as Error).message}`, 'recordCheckIn');
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while recording check-in", {
        userNotice: "チェックインの記録中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
}

async function getUserCheckIns(userId: string) {
  try {
    const checkins = await prisma.checkin.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    logger.success(`Retrieved ${checkins.length} check-ins for user ${userId}`, 'getUserCheckIns');
    return checkins;
  } catch (error) {
    logger.error(`Failed to retrieve check-ins for user ${userId}: ${(error as Error).message}`, 'getUserCheckIns');
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while fetching user check-ins", {
        userNotice: "チェックイン情報の取得中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
}

async function getUserCheckinsWithPagination(userId: string, page: number, pageSize: number) {
  try {
    const totalCount = await prisma.checkin.count({
      where: { userId },
    });
    const checkins = await prisma.checkin.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    logger.success(`Retrieved page ${page} of check-ins for user ${userId}`, 'getUserCheckinsWithPagination');
    return {
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      checkins,
    };
  } catch (error) {
    logger.error(`Failed to retrieve paginated check-ins for user ${userId}: ${(error as Error).message}`, 'getUserCheckinsWithPagination');
    if (error instanceof PrismaClientKnownRequestError) {
      wrapPrismaKnownErrorHelper(error);
    } else {
      throw new DataUnknownError("An unknown error occurred while fetching user check-ins", {
        userNotice: "チェックイン情報の取得中に不明なエラーが発生しました。",
        errorCode: "DATA_UNKNOWN_ERROR",
      });
    }
  }
}

export { recordCheckIn, getUserCheckIns, getUserCheckinsWithPagination };

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
