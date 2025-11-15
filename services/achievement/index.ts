import Logger from "@/lib/logger";
import Achievements from "./definitions";
import { prisma } from "@/lib/prisma";

const logger = new Logger("AchievementService");
const DEBUG_FEATURES_ENABLED = false;

async function createAchivementContext(checkinId: string) {
  const checkin = await prisma.checkin.findUnique({
    where: { id: checkinId },
    include: { checkpoint: true },
  });
  if (!checkin) {
    throw new Error(`Checkin with id ${checkinId} not found`);
  }
  const allCheckpoints = await prisma.checkpoint.findMany();
  const allCategories = await prisma.category.findMany();
  const userCheckins = await prisma.checkin.findMany({
    where: { userId: checkin.userId },
    include: { checkpoint: true },
    orderBy: { createdAt: "desc" },
  });
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
    allCategories,
    userCheckins
  };
}

const DEBUG_CHECKPOINT_ID = "debug_checkpoint";
const DEBUG_ACHIEVEMENT_ID = "debug_achievement";

export function isDebugCheckpoint(checkpointId: string | undefined) {
  if (!DEBUG_FEATURES_ENABLED) return false;
  return checkpointId === DEBUG_CHECKPOINT_ID;
}

export function shouldSkipAchievement(
  achievementId: string,
  context: Awaited<ReturnType<typeof createAchivementContext>>,
  debugMode: boolean,
) {
  if (!DEBUG_FEATURES_ENABLED) {
    return context.earnedAchievements.has(achievementId);
  }
  if (debugMode) return false;
  if (achievementId === DEBUG_ACHIEVEMENT_ID) return false;
  return context.earnedAchievements.has(achievementId);
}

async function process(checkinId: string): Promise<string[]> {
  logger.info(`Processing achievements for checkin ${checkinId}`);
  const earnedAchievements: string[] = [];
  const context = await createAchivementContext(checkinId);
  const debugMode =
    DEBUG_FEATURES_ENABLED && isDebugCheckpoint(context.checkin.checkpoint.id);

  for (const achievement of Achievements) {
    try {
      if (shouldSkipAchievement(achievement.id, context, debugMode)) {
        continue;
      }

      const shouldExecute = debugMode
        ? true
        : await achievement.shouldExecute(context);

      if (!shouldExecute) continue;

      const executed = debugMode
        ? true
        : await achievement.execute(context);

      if (!executed) continue;

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
    } catch (error) {
      logger.error(`Error processing achievement ${achievement.id}: ${error}`);
    }
  }

  return earnedAchievements;
}

async function getUserAchievements(userId: string): Promise<string[]> {
  const achievementRecords = await prisma.achievement.findMany({
    where: { userId },
  });
  return achievementRecords.map((record) => record.achievementId);
}

export { process as processAchievements, getUserAchievements };
