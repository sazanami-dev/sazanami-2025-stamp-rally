import test from "node:test";
import assert from "node:assert/strict";
import { isDebugCheckpoint, shouldSkipAchievement } from "../index";
import type { AchievementContext } from "../../types";
import { createCheckin } from "./helpers";

test("isDebugCheckpoint always returns false while debug mode is disabled", () => {
  assert.equal(isDebugCheckpoint("debug_checkpoint"), false);
  assert.equal(isDebugCheckpoint("other"), false);
  assert.equal(isDebugCheckpoint(undefined), false);
});

test("shouldSkipAchievement skips already-earned achievements", () => {
  const context = {
    userId: "u",
    checkin: createCheckin(),
    earnedAchievements: new Set(["floor-master-1"]),
    allCheckpoints: [],
    allCategories: [],
    userCheckins: [],
  } as AchievementContext;
  assert.equal(shouldSkipAchievement("floor-master-1", context, false), true);
});

test("shouldSkipAchievement does not skip achievements that are not yet earned", () => {
  const context = {
    userId: "u",
    checkin: createCheckin(),
    earnedAchievements: new Set(["floor-master-1"]),
    allCheckpoints: [],
    allCategories: [],
    userCheckins: [],
  } as AchievementContext;
  assert.equal(shouldSkipAchievement("floor-master-2", context, false), false);
});

test("shouldSkipAchievement ignores debug flag when debug mode is disabled", () => {
  const context = {
    userId: "u",
    checkin: createCheckin(),
    earnedAchievements: new Set(["anything"]),
    allCheckpoints: [],
    allCategories: [],
    userCheckins: [],
  } as AchievementContext;
  assert.equal(shouldSkipAchievement("anything", context, true), true);
});
