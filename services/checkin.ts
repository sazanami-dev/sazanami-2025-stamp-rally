import { prisma } from "@/lib/prisma";
import Logger from "@/lib/logger";

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
    throw error;
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
    throw error;
  }
}

export { recordCheckIn, getUserCheckIns };
