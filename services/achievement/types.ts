import { Checkpoint, Checkin } from "@prisma/client";

export type CheckinWithCheckpoint = Checkin & {
  checkpoint: Checkpoint;
};

export interface AchievementContext {
  userId: string;
  checkin: CheckinWithCheckpoint;
  earnedAchievements: Set<string>;
  allCheckpoints: Checkpoint[];
}

export interface AchievementStrategy {
  id: string;
  shouldExecute(context: AchievementContext): Promise<boolean>;
  execute(context: AchievementContext): Promise<boolean>;
}
