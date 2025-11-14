import test from "node:test";
import assert from "node:assert/strict";
import { HelloWorldAchievement } from "../../definitions/hello-world";
import { buildCheckinHistory, createContext } from "../helpers";

test("HelloWorldAchievement grants when no prior history", async () => {
  const firstCheckin = createContext({
    userCheckins: [],
  });
  assert.equal(await HelloWorldAchievement.shouldExecute(firstCheckin), true);
  assert.equal(await HelloWorldAchievement.execute(firstCheckin), true);
});

test("HelloWorldAchievement triggers on very first historical entry only", async () => {
  const context = createContext({
    userCheckins: buildCheckinHistory(["c1"]),
  });
  assert.equal(await HelloWorldAchievement.shouldExecute(context), true);

  const subsequent = createContext({
    userCheckins: buildCheckinHistory(["c2", "c1"]),
  });
  assert.equal(await HelloWorldAchievement.shouldExecute(subsequent), false);
  assert.equal(await HelloWorldAchievement.execute(subsequent), false);
});
