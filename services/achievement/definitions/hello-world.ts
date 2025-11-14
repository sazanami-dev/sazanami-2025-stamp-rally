import { AchievementContext, AchievementStrategy } from "../types";

export const HelloWorldAchievement: AchievementStrategy = {
  id: "hello-world",
  async shouldExecute(_context: AchievementContext): Promise<boolean> {
    if (_context.userCheckins.length > 1) {
      return false;
    }

    return true;
  },
  async execute(_context: AchievementContext): Promise<boolean> {
    return this.shouldExecute(_context); // Always true if shouldExecute is true
  },
};

