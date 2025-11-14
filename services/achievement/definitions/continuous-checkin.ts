import { AchievementContext, AchievementStrategy } from "../types";

export const ContinuousCheckinAchievement: AchievementStrategy = {
  id: "continuous-checkin",
  async shouldExecute(_context: AchievementContext): Promise<boolean> {
    const lastCheckin = _context.userCheckins[0];
    if (!lastCheckin) {
      return false;
    }
    if (_context.checkin.id === lastCheckin.id) {
      return true;
    }
    return false;
  },
  async execute(_context: AchievementContext): Promise<boolean> {
    return this.shouldExecute(_context); // Always true if shouldExecute is true
  }
}
