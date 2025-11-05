import { AchievementContext, AchievementStrategy } from "../types";

export const DebugAchievement: AchievementStrategy = {
  id: "debug_achievement",
  async shouldExecute(_context: AchievementContext): Promise<boolean> {
    return true;
  },
  async execute(_context: AchievementContext): Promise<boolean> {
    return true;
  },
};
