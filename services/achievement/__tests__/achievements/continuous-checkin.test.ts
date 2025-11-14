import test from "node:test";
import assert from "node:assert/strict";
import { ContinuousCheckinAchievement } from "../../definitions/continuous-checkin";
import { buildCheckinHistory, createCheckin, createContext } from "../helpers";

test("ContinuousCheckinAchievement shouldExecute returns false when history empty", async () => {
  const context = createContext({
    checkin: createCheckin({ id: "c-current" }),
    userCheckins: [],
  });
  assert.equal(await ContinuousCheckinAchievement.shouldExecute(context), false);
});

test("ContinuousCheckinAchievement only accepts if newest entry matches current checkin id", async () => {
  const context = createContext({
    checkin: createCheckin({ id: "match-id" }),
    userCheckins: buildCheckinHistory(["match-id", "older"]),
  });
  assert.equal(await ContinuousCheckinAchievement.shouldExecute(context), true);

  const mismatch = createContext({
    checkin: createCheckin({ id: "current-id" }),
    userCheckins: buildCheckinHistory(["different-id", "current-id"]),
  });
  assert.equal(await ContinuousCheckinAchievement.shouldExecute(mismatch), false);
});

test("ContinuousCheckinAchievement ignores duplicate IDs deeper in history", async () => {
  const context = createContext({
    checkin: createCheckin({ id: "current" }),
    userCheckins: buildCheckinHistory(["other", "current", "current"]),
  });
  assert.equal(await ContinuousCheckinAchievement.shouldExecute(context), false);
});

test("ContinuousCheckinAchievement execute mirrors shouldExecute outcome", async () => {
  const context = createContext({
    checkin: createCheckin({ id: "x" }),
    userCheckins: buildCheckinHistory(["x"]),
  });
  assert.equal(await ContinuousCheckinAchievement.execute(context), true);

  const negativeContext = createContext({
    checkin: createCheckin({ id: "a" }),
    userCheckins: buildCheckinHistory(["b"]),
  });
  assert.equal(await ContinuousCheckinAchievement.execute(negativeContext), false);
});
