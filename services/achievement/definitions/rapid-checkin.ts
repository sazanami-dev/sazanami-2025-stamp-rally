import { AchievementContext, AchievementStrategy } from "../types";

const RAPID_CHECKIN_THRESHOLD_MS = 3 * 60 * 1000; // 3分

export const RapidCheckinAchievement: AchievementStrategy = {
  id: "rapid-checkin",
  async shouldExecute(context: AchievementContext): Promise<boolean> {
    if (context.userCheckins.length < 2) {
      return false; // 最低2回のチェックインが必要
    }
    return true;
  },
  async execute(context: AchievementContext): Promise<boolean> {
    const sortedCheckins = context.userCheckins
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    for (let i = 0; i < sortedCheckins.length - 1; i++) {
      if (sortedCheckins[i].createdAt.getTime() - sortedCheckins[i + 1].createdAt.getTime() > RAPID_CHECKIN_THRESHOLD_MS) {
        break;
      }
      const currentCheckin = sortedCheckins[i];
      const nextCheckin = sortedCheckins[i + 1];
      const timeDifference = currentCheckin.createdAt.getTime() - nextCheckin.createdAt.getTime();
      if (timeDifference <= RAPID_CHECKIN_THRESHOLD_MS) {
        return true;
      }
    }

    return false;
  }
};
