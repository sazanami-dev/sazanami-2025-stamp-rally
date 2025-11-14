import { Checkpoint, Checkin, Category } from "@prisma/client";

export type CheckinWithCheckpoint = Checkin & {
  checkpoint: Checkpoint;
};

export interface AchievementContext {
  userId: string;
  checkin: CheckinWithCheckpoint;
  earnedAchievements: Set<string>;
  allCheckpoints: Checkpoint[];
  allCategories: Category[];
  userCheckins: CheckinWithCheckpoint[];
}

export interface AchievementStrategy {
  id: string;
  shouldExecute(context: AchievementContext): Promise<boolean>;
  execute(context: AchievementContext): Promise<boolean>;
}
