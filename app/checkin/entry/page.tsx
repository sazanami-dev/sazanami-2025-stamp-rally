"use client";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";

export default function CheckinEntryPage() {

  // クエリパラメータの取得
  const [checkpointId, setCheckpointId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCheckpointId(params.get("checkpointId") || "invalid");

    // TODO: Call checkin action
  }, []);

  return (
    <>
      <div className="h-max min-h-screen w-full flex flex-col items-center justify-center py-12">
        <Card className="w-[90%] max-w-[24em] h-[16em]">
          <CardBody className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <Spinner className="py-6" />
              <p className="text-md py-1">しばらくお待ちください...</p>
              <p className="text-small text-default-500 py-2">チェックイン処理中です</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
