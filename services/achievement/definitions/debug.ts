import { AchievementContext, AchievementStrategy } from "../types";

export const DebugAchievement: AchievementStrategy = {
  id: "debug_achievement",
  async shouldExecute(context: AchievementContext): Promise<boolean> {
    return true;
  },
  async execute(context: AchievementContext): Promise<boolean> {
    return true;
  },
};
