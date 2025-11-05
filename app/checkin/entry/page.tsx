import { Button } from "@heroui/button";
import { recordCheckIn } from "@/services/checkin";
import { process as processAchievement } from "@/services/achievement";

export default function CheckinEntryPage() {

  const handleDebugCheckin = async () => {
    "use server";

    const userId = "debug-user";
    const checkpointId = "debug_checkpoint";
    try {
      const checkin = await recordCheckIn(userId, checkpointId);
      const achievementResult = await processAchievement(checkin.id);
      
    } catch (error) {
      console.error("Error during debug check-in:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6">
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
