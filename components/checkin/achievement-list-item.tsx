"use client"
import { Card } from "@heroui/card"
import { getAchivementMetadata } from "@/lib/front/mappers";
import { useMemo } from "react";

type AchievementListItemProps = {
  achievementId: string;
}

export default function AchievementListItem(props: AchievementListItemProps) {
  const { achievementId } = props;

  const metadata = useMemo(() => {
    return getAchivementMetadata(achievementId);
  }, [achievementId]);

  return <>
    <Card className="w-full max-w-md hover:shadow-lg">
      <div className="flex flex-row items-center space-x-4 p-3">
        <div className={`p-2 w-15 h-15 flex items-center justify-center rounded-full ${metadata ? metadata.bgClass : ""}`}>
          {metadata ? metadata.icon : null}
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">
            {metadata ? metadata.title : "Unknown Achievement"}
          </div>
          <div className="text-sm text-gray-500">
            {metadata ? metadata.description : "No description available."}
          </div>
        </div>
      </div>
    </Card>
  </>
}
