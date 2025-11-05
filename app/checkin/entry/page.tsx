import { Button } from "@heroui/button";
import { recordCheckIn } from "@/services/checkin";
import { process as processAchievement } from "@/services/achievement";

export default function CheckinEntryPage() {

  const handleDebugCheckin = async () => {
    "use server";
    const userId = "debug-user-id";
    const checkpointId = "debug-checkpoint-id";
    try {
      const checkin = await recordCheckIn(userId, checkpointId);
      console.log("Check-in recorded:", checkin);
      const achievementResult = await processAchievement(userId);
      console.log("Achievement processed:", achievementResult);
    } catch (error) {
      console.error("Error during debug check-in:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-amber-200">
        <Button
          variant="solid"
          color="primary"
          onPress={handleDebugCheckin}
        >
          Debug Checkin
        </Button>
      </div>
    </>
  );
}
