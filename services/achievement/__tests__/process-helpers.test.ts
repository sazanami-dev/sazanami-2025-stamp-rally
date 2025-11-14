import test from "node:test";
import assert from "node:assert/strict";
import { isDebugCheckpoint, shouldSkipAchievement } from "../index";
import type { AchievementContext } from "../../types";
import { createCheckin } from "./helpers";

test("isDebugCheckpoint only returns true for debug checkpoint id", () => {
  assert.equal(isDebugCheckpoint("debug_checkpoint"), true);
  assert.equal(isDebugCheckpoint("other"), false);
  assert.equal(isDebugCheckpoint(undefined), false);
});

test("shouldSkipAchievement skips already-earned achievements when not debug", () => {
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

test("shouldSkipAchievement does not skip debug achievement even if earned", () => {
  const context = {
    userId: "u",
    checkin: createCheckin(),
    earnedAchievements: new Set(["debug_achievement"]),
    allCheckpoints: [],
    allCategories: [],
    userCheckins: [],
  } as AchievementContext;
  assert.equal(shouldSkipAchievement("debug_achievement", context, false), false);
});

test("shouldSkipAchievement never skips in debug mode", () => {
  const context = {
    userId: "u",
    checkin: createCheckin(),
    earnedAchievements: new Set(["anything"]),
    allCheckpoints: [],
    allCategories: [],
    userCheckins: [],
  } as AchievementContext;
  assert.equal(shouldSkipAchievement("anything", context, true), false);
});
