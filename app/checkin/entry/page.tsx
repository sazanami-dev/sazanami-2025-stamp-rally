"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { handleDebugCheckin } from "./actions";
import { useState } from "react";

export default function CheckinEntryPage() {

  const [checkpointId, setCheckpointId] = useState("debug_checkpoint");
  const [userId, setUserId] = useState("debug-user");

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <Input
          label="Debug Checkpoint ID"
          defaultValue="debug_checkpoint"
          onChange={(e) => setCheckpointId(e.currentTarget.value)}
        />
        <Input
          label="Debug User ID"
          defaultValue="debug-user"
          onChange={(e) => setUserId(e.currentTarget.value)}
        />

        <Button
          variant="solid"
          color="primary"
          onPress={async () => {
            await handleDebugCheckin(checkpointId, userId);
          }}
        >
          Debug Checkin
        </Button>

      </div>
    </>
  );
}
