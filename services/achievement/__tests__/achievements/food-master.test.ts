import test from "node:test";
import assert from "node:assert/strict";
import { FoodMasterAchievement } from "../../definitions/food-master";
import { createCategory, createCheckpoint, createCheckin, createContext } from "../helpers";

const foodCategory = createCategory({ id: "food_booth", name: "Food" });

const makeFoodCheckpoint = (id: string) =>
  createCheckpoint({ id, categoryId: "food_booth", displayName: `Food-${id}` });

test("FoodMasterAchievement requires at least 80% of food checkpoints", async () => {
  const foodPoints = [
    makeFoodCheckpoint("1"),
    makeFoodCheckpoint("2"),
    makeFoodCheckpoint("3"),
    makeFoodCheckpoint("4"),
    makeFoodCheckpoint("5"),
  ];
  const sufficientContext = createContext({
    allCheckpoints: foodPoints,
    allCategories: [foodCategory],
    userCheckins: [
      createCheckin({ checkpoint: foodPoints[0] }),
      createCheckin({ checkpoint: foodPoints[1] }),
      createCheckin({ checkpoint: foodPoints[2] }),
      createCheckin({ checkpoint: foodPoints[3] }),
    ],
  });
  assert.equal(await FoodMasterAchievement.shouldExecute(sufficientContext), true);

  const insufficient = createContext({
    allCheckpoints: foodPoints,
    userCheckins: [
      createCheckin({ checkpoint: foodPoints[0] }),
      createCheckin({ checkpoint: foodPoints[1] }),
      createCheckin({ checkpoint: foodPoints[2] }),
    ],
  });
  assert.equal(await FoodMasterAchievement.shouldExecute(insufficient), false);
});

test("FoodMasterAchievement handles cases with no food checkpoints gracefully", async () => {
  const context = createContext({
    allCheckpoints: [],
    userCheckins: [],
  });
  const result = await FoodMasterAchievement.shouldExecute(context);
  // with zero checkpoints, Math.ceil(0) => 0, so achievement should be considered obtained
  assert.equal(result, true);
});

test("FoodMasterAchievement rounds up required count correctly", async () => {
  const foodPoints = [makeFoodCheckpoint("1"), makeFoodCheckpoint("2"), makeFoodCheckpoint("3")];
  const context = createContext({
    allCheckpoints: foodPoints,
    userCheckins: [
      createCheckin({ checkpoint: foodPoints[0] }),
      createCheckin({ checkpoint: foodPoints[1] }),
    ],
  });
  // ceil(3 * 0.8) => ceil(2.4) => 3, so two checkins should not be enough.
  assert.equal(await FoodMasterAchievement.shouldExecute(context), false);
});
