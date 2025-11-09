"use client";
import { Card, CardBody } from "@heroui/card";
import { TbAlertCircle } from "react-icons/tb";

// Props
type CheckinErrorProps = {
  error: string | null;
  errorDetail?: string | null;
};

export default function CheckinError({ error }: CheckinErrorProps) {

  const errorText = error || '何らかのエラーが発生しました'; // TODO: Fix
  const errorDetail = ''; // TODO: Fix

  return (
    <Card className="w-[90%] max-w-[24em] h-[16em]">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <TbAlertCircle className="text-8xl text-red-500 py-6" />
          <p className="text-md py-1">{errorText}</p>
          {errorDetail &&
            <p className="text-small text-default-500 py-2">{errorDetail}</p>
          }
        </div>
      </CardBody>
    </Card>
  );
}
