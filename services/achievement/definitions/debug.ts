import { AchievementContext, AchievementStrategy } from "../types";

export const DebugAchievement: AchievementStrategy = {
  id: "debug_achievement",
  async shouldExecute(context: AchievementContext): Promise<boolean> {
    console.log("DebugAchievement.shouldExecute called with context:", context);
    return true;
  },
  async execute(context: AchievementContext): Promise<boolean> {
    console.log("DebugAchievement.execute called with context:", context);
    return true;
  },
};
