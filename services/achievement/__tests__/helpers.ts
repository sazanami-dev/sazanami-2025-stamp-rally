import type { AchievementContext, CheckinWithCheckpoint } from "../types";
import type { Category, Checkpoint } from "@prisma/client";

const baseDate = new Date("2024-01-01T00:00:00Z");

export const createCheckpoint = (
  overrides: Partial<Checkpoint> = {},
): Checkpoint => ({
  id: "checkpoint-1",
  displayName: "Test Checkpoint",
  floor: 1,
  categoryId: "category-1",
  comment: null,
  cooldownDurationOverride: null,
  createdAt: baseDate,
  ...overrides,
});

export const createCategory = (
  overrides: Partial<Category> = {},
): Category => ({
  id: "category-1",
  name: "Test Category",
  cooldownDuration: 0,
  ...overrides,
});

export const createCheckin = (
  overrides: Partial<CheckinWithCheckpoint> = {},
): CheckinWithCheckpoint => {
  const checkpoint =
    overrides.checkpoint ?? createCheckpoint({ id: overrides.checkpointId ?? "checkpoint-1" });

  return {
    id: "checkin-1",
    userId: "user-1",
    checkpointId: checkpoint.id,
    createdAt: baseDate,
    checkpoint,
    ...overrides,
  } as CheckinWithCheckpoint;
};

export const createContext = (
  overrides: Partial<AchievementContext> = {},
): AchievementContext => ({
  userId: "user-1",
  checkin: createCheckin(),
  earnedAchievements: new Set(),
  allCheckpoints: [],
  allCategories: [],
  userCheckins: [],
  ...overrides,
});

export const buildCheckinHistory = (ids: string[]): CheckinWithCheckpoint[] =>
  ids.map((id) => createCheckin({ id }));
