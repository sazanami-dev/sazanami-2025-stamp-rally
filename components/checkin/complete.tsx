"use client";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { TbCheck } from "react-icons/tb";
import { useRouter } from "next/navigation";
import AchievementListItem from "./achievement-list-item";
import { useEffect } from "react";
import { useReward } from "react-rewards";

type CheckinCompleteProps = {
  achievedIds: string[];
}

export default function CheckinComplete(props: CheckinCompleteProps) {
  const router = useRouter();

  let { achievedIds } = props;

  useEffect(() => {
    if (!achievedIds) {
      achievedIds = [];
    }
  }, [achievedIds]);
  const { reward, isAnimating } = useReward('rewardId', 'confetti', {
    position: "absolute",
  });

  useEffect(() => {
    if (!isAnimating) {
      reward();
    }
  }, [isAnimating])

  return <>
    <Card className="w-[90%] max-w-[24em]">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <TbCheck className="text-8xl text-green-500 py-6" />
          <p className="text-xl py-1">チェックインしました！</p>
          {achievedIds.length > 0 &&
            <div className="flex flex-col items-center justify-center w-full">
              <Divider className="w-[80%] my-4" />
              <p className="text-sm pb-4 text-gray-700">{achievedIds.length}件のアチーブメントを獲得しました</p>
              <div className="flex flex-col gap-2 w-full">
                {achievedIds.map((id) => (
                  <AchievementListItem achievementId={id} key={id} />
                ))}
              </div>
            </div>
          }
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg my-4 animate-bounce"
            onPress={() => router.push("/")}
          >
            ホームに戻る
          </Button>
        </div>
      </CardBody>
    </Card>
    <div id="rewardId" className="left-[50%]"></div>
  </>
}
