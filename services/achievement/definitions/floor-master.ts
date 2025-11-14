import { AchievementContext, AchievementStrategy } from "../types";

const FLOORS = [0, 1, 2, 3, 4, 5, 6, 7];

function createFloorMasterAchievement(floor: number): AchievementStrategy {
  return {
    id: `floor-master-${floor}`,
    async shouldExecute(context: AchievementContext): Promise<boolean> {
      const floorCheckpoints = context.allCheckpoints.filter(
        (checkpoint) => checkpoint.floor === floor,
      );
      if (floorCheckpoints.length === 0) {
        return false;
      }
      const visited = new Set(
        context.userCheckins
          .filter((checkin) => checkin.checkpoint.floor === floor)
          .map((checkin) => checkin.checkpoint.id),
      );
      const required = Math.ceil(floorCheckpoints.length * 0.8);
      return visited.size >= required;
    },
    async execute(context: AchievementContext): Promise<boolean> {
      return this.shouldExecute(context);
    },
  };
}

export const FloorMasterAchievements = FLOORS.map(createFloorMasterAchievement);
