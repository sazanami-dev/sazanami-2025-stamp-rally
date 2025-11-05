import { prisma } from "@/lib/prisma";
import Logger from "@/lib/logger";

const logger = new Logger('checkin');

async function recordCheckIn(userId: string, checkpointId: string) {
  try {
    const checkIn = await prisma.checkIn.create({
      data: {
        userId,
        checkpointId,
      },
    });
    logger.success(`Check-in recorded: ${checkIn.id}`, 'recordCheckIn');
    return checkIn;
  } catch (error) {
    logger.error(`Failed to record check-in: ${(error as Error).message}`, 'recordCheckIn');
    throw error;
  }
}

async function getUserCheckIns(userId: string) {
  try {
    const checkIns = await prisma.checkIn.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    logger.success(`Retrieved ${checkIns.length} check-ins for user ${userId}`, 'getUserCheckIns');
    return checkIns;
  } catch (error) {
    logger.error(`Failed to retrieve check-ins for user ${userId}: ${(error as Error).message}`, 'getUserCheckIns');
    throw error;
  }
}

export { recordCheckIn, getUserCheckIns };
