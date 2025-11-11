"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card"
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa"
import { getCategoryIcon } from "@/lib/front/mappers";

type CheckinItemProps = {
  checkpointName: string;
  positionDescription?: string;
  message?: string;
  categoryId?: string;
  checkinTime: Date;
  cooldownEndTime: Date;
}

export default function CheckinListItem(props: CheckinItemProps) {
  const { checkpointName, positionDescription, message, checkinTime, cooldownEndTime } = props;
  const [isCooldownOver, setIsCooldownOver] = useState<boolean>(false);
  const [formattedCheckinTime, setFormattedCheckinTime] = useState<string>("");
  const [formattedCooldownRemainingTime, setFormattedCooldownRemainingTime] = useState<string>("");

  // 時間だけ取り出せばOK
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
  }

  useEffect(() => {
    const now = new Date();
    setIsCooldownOver(now >= cooldownEndTime);
    setFormattedCheckinTime(formatDate(checkinTime));
    setInterval(() => {
      const now = new Date();
      setIsCooldownOver(now >= cooldownEndTime);
      if (now < cooldownEndTime) {
        const diffMs = cooldownEndTime.getTime() - now.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffSeconds = Math.floor((diffMs % 60000) / 1000);
        setFormattedCooldownRemainingTime(`${diffMinutes}分${diffSeconds}秒`);
      } else {
        setFormattedCooldownRemainingTime("終了済み");
      }
    });

  }, []);


  return <>
    <Card shadow="sm" className="w-full max-w-md mx-auto my-4">
      <CardHeader className="flex gap-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex flex-col">
          <span className="font-semibold text-xl">{checkpointName}</span>
          <span className="text-sm opacity-80">{positionDescription}</span>
        </div>
        <div className="ml-auto mr-2 flex items-center">
          {/* <FaClock className="text-4xl mt-4 mb-4" /> */}
          {getCategoryIcon(props.categoryId || "fallback")({ className: "text-4xl mt-4 mb-4" })}
        </div>
      </CardHeader>
      {message &&
        <CardBody className="p-4">
          <p className="text-gray-700">{message}</p>
        </CardBody>
      }
      <CardFooter className="flex justify-between items-center p-2 bg-gray-100 rounded-b-lg">
        <div className="flex gap-2 items-center ml-2">
          <FaClock className="text-xs text-gray-500" />
          <p className="text-sm text-gray-500">{formattedCheckinTime}</p>
        </div>
        {/* <p className="text-sm text-gray-500 mr-2">✅️終了済み</p> */}
        <div className="text-sm text-gray-500 flex items-center gap-1 mr-2">
          <p className="">クールダウン: </p>
          {isCooldownOver ? (
            <span className="text-green-600">終了済み</span>
          ) : (
            <span className="text-red-600 opacity-70">{formattedCooldownRemainingTime}</span>
          )}
        </div>

      </CardFooter>
    </Card>
  </>
}
