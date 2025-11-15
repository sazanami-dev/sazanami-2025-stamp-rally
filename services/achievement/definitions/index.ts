import { HelloWorldAchievement } from "./hello-world";
import { ContinuousCheckinAchievement } from "./continuous-checkin";
import { RapidCheckinAchievement } from "./rapid-checkin";
import { FoodMasterAchievement } from "./food-master";
import { FloorMasterAchievements } from "./floor-master";

export default [
  // DebugAchievement, // disabled for production deployment
  HelloWorldAchievement,
  ContinuousCheckinAchievement,
  RapidCheckinAchievement,
  FoodMasterAchievement,
  ...FloorMasterAchievements,
];
