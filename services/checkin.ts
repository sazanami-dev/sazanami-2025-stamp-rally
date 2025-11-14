import { prisma } from "@/lib/prisma";
import Logger from "@/lib/logger";

const logger = new Logger('checkin');

async function recordCheckIn(userId: string, checkpointId: string) {
  const checkin = await prisma.checkin.create({
    data: {
      userId,
      checkpointId,
    },
  });
  logger.success(`Check-in recorded: ${checkin.id}`, 'recordCheckIn');
  return checkin;
}

async function getUserCheckIns(userId: string) {
  const checkins = await prisma.checkin.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  logger.success(`Retrieved ${checkins.length} check-ins for user ${userId}`, 'getUserCheckIns');
  return checkins;
}

async function getUserCheckinsIncludeCheckpointWithPagination(userId: string, page: number, pageSize: number) {
  const totalCount = await prisma.checkin.count({
    where: { userId },
  });
  const checkins = await prisma.checkin.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      checkpoint: true,
    },
  });
  logger.success(`Retrieved page ${page} of check-ins for user ${userId}`, 'getUserCheckinsWithPagination');
  return {
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    checkins,
  };
}

export { recordCheckIn, getUserCheckIns, getUserCheckinsIncludeCheckpointWithPagination };
