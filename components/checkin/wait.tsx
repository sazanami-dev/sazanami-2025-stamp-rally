"use client";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";

export default function CheckinWait() {
  return <>
    <Card className="w-[90%] max-w-[24em] h-[16em]">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Spinner className="py-6" />
          <p className="text-md py-1">しばらくお待ちください...</p>
          <p className="text-small text-default-500 py-2">チェックイン処理中です</p>
        </div>
      </CardBody>
    </Card>
  </>
}
