import test from "node:test";
import assert from "node:assert/strict";
import { DebugAchievement } from "../../definitions/debug";
import { createContext } from "../helpers";

test("DebugAchievement always reports shouldExecute=true", async () => {
  const context = createContext();
  assert.equal(await DebugAchievement.shouldExecute(context), true);
});

test("DebugAchievement execute returns true regardless of context", async () => {
  const context = createContext({
    earnedAchievements: new Set(["some-other-achievement"]),
  });
  assert.equal(await DebugAchievement.execute(context), true);
});
