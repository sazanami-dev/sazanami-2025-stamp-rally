"use client";
import { Card, CardBody } from "@heroui/card";
import { TbAlertCircle } from "react-icons/tb";

// Props
type CheckinErrorProps = {
  error: string | null;
  errorDetail?: string | null;
};

export default function CheckinError({ error, errorDetail }: CheckinErrorProps) {

  const errorText = error || '何らかのエラーが発生しました';
  const detailText = errorDetail ?? '';

  return (
    <Card className="w-[90%] max-w-[24em] h-[16em]">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <TbAlertCircle className="text-8xl text-red-500 py-6" />
          <p className="text-md py-1 text-left w-full">{errorText}</p>
          {detailText && (
            <p className="text-small text-default-500 py-2 text-left w-full break-words">
              {detailText}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
