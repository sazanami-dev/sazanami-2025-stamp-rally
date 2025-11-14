import { AchievementContext, AchievementStrategy } from "../types";

const FOOD_CATEGORY_ID = "food_booth"

export const FoodMasterAchievement: AchievementStrategy = {
  id: "food-master",
  async shouldExecute(context: AchievementContext): Promise<boolean> {
    const foodCheckpoints = context.allCheckpoints.filter(
      (checkpoint) => checkpoint.categoryId === FOOD_CATEGORY_ID
    );
    const userFoodCheckins = context.userCheckins.filter(
      (checkin) => checkin.checkpoint.categoryId === FOOD_CATEGORY_ID
    );
    const requiredCheckins = Math.ceil(foodCheckpoints.length * 0.8);
    return userFoodCheckins.length >= requiredCheckins;
  },
  async execute(context: AchievementContext): Promise<boolean> {
    return this.shouldExecute(context); // Always true if shouldExecute is true
  }
};
