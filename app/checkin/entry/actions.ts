"use server";

import { recordCheckIn } from "@/services/checkin";
import { process as processAchievement } from "@/services/achievement";

const handleDebugCheckin = async (checkpointId: string, userId: string) => {
  console.log(
    `Debug Check-in initiated for User ID: ${userId} at Checkpoint ID: ${checkpointId}`
  );
  try {
    const checkin = await recordCheckIn(userId, checkpointId);
    const achievementResult = await processAchievement(checkin.id);
  } catch (error) {
    console.error("Error during debug check-in:", error);
  }
}

export { handleDebugCheckin };
