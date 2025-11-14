import test from "node:test";
import assert from "node:assert/strict";
import { RapidCheckinAchievement } from "../../definitions/rapid-checkin";
import { createCheckin, createContext } from "../helpers";

const baseDate = new Date("2024-01-01T00:00:00Z");

const minutesAgo = (minutes: number) =>
  new Date(baseDate.getTime() - minutes * 60 * 1000);

test("RapidCheckinAchievement requires at least two checkins", async () => {
  const single = createContext({
    userCheckins: [createCheckin({ createdAt: baseDate })],
  });
  assert.equal(await RapidCheckinAchievement.shouldExecute(single), false);
});

test("RapidCheckinAchievement detects checkins within threshold", async () => {
  const context = createContext({
    userCheckins: [
      createCheckin({ id: "recent", createdAt: baseDate }),
      createCheckin({ id: "recent-2", createdAt: minutesAgo(2) }),
      createCheckin({ id: "older", createdAt: minutesAgo(10) }),
    ],
  });
  assert.equal(await RapidCheckinAchievement.execute(context), true);
});

test("RapidCheckinAchievement fails when all gaps exceed threshold", async () => {
  const context = createContext({
    userCheckins: [
      createCheckin({ id: "c1", createdAt: baseDate }),
      createCheckin({ id: "c2", createdAt: minutesAgo(5) }),
      createCheckin({ id: "c3", createdAt: minutesAgo(15) }),
    ],
  });
  assert.equal(await RapidCheckinAchievement.execute(context), false);
});

test("RapidCheckinAchievement treats exactly-threshold difference as success", async () => {
  const context = createContext({
    userCheckins: [
      createCheckin({ id: "c1", createdAt: baseDate }),
      createCheckin({ id: "c2", createdAt: minutesAgo(3) }),
    ],
  });
  assert.equal(await RapidCheckinAchievement.execute(context), true);
});

test("RapidCheckinAchievement handles unsorted history by sorting internally", async () => {
  const context = createContext({
    userCheckins: [
      createCheckin({ id: "late", createdAt: minutesAgo(10) }),
      createCheckin({ id: "recent", createdAt: baseDate }),
      createCheckin({ id: "recent-2", createdAt: minutesAgo(1) }),
    ],
  });
  assert.equal(await RapidCheckinAchievement.execute(context), true);
});
