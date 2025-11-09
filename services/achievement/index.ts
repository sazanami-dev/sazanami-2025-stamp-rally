import Logger from "@/lib/logger";
import Achievements from "./definitions";
import { prisma } from "@/lib/prisma";

const logger = new Logger("AchievementService");

async function createAchivementContext(checkinId: string) {
  const checkin = await prisma.checkin.findUnique({
    where: { id: checkinId },
    include: { checkpoint: true },
  });
  if (!checkin) {
    throw new Error(`Checkin with id ${checkinId} not found`);
  }
  const allCheckpoints = await prisma.checkpoint.findMany();
  const earnedAchievementRecords = await prisma.achievement.findMany({
    where: { userId: checkin.userId },
  });
  const earnedAchievements = new Set(
    earnedAchievementRecords.map((record) => record.achievementId)
  );
  return {
    userId: checkin.userId,
    checkin,
    earnedAchievements,
    allCheckpoints,
  };
}

async function process(checkinId: string): Promise<string[]> {
  logger.info(`Processing achievements for checkin ${checkinId}`);
  const earnedAchievements: string[] = [];
  const context = await createAchivementContext(checkinId);
  for (const achievement of Achievements) {
    try {
      const shouldExecute = await achievement.shouldExecute(context);
      if (shouldExecute) {
        const executed = await achievement.execute(context);
        if (executed) {
          await prisma.achievement.create({
            data: {
              userId: context.userId,
              achievementId: achievement.id,
            },
          });
          earnedAchievements.push(achievement.id);
          logger.info(
            `User ${context.userId} earned achievement ${achievement.id}`
          );
        }
      }
    } catch (error) {
      logger.error(`Error processing achievement ${achievement.id}: ${error}`);
    }
  }

  return earnedAchievements;
}

export { process as processAchievements };
