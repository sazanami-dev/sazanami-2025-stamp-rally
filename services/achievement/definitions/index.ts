import { DebugAchievement } from "./debug";
import { HelloWorldAchievement } from "./hello-world";
import { ContinuousCheckinAchievement } from "./continuous-checkin";
import { RapidCheckinAchievement } from "./rapid-checkin";
import { FoodMasterAchievement } from "./food-master";
import { FloorMasterAchievements } from "./floor-master";

export default [
  DebugAchievement,
  HelloWorldAchievement,
  ContinuousCheckinAchievement,
  RapidCheckinAchievement,
  FoodMasterAchievement,
  ...FloorMasterAchievements,
];
