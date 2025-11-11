import { IoFastFoodOutline, IoHammerOutline, IoHelpOutline, IoGolfOutline } from "react-icons/io5";

export function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case "food":
      return IoFastFoodOutline;
    case "debug":
      return IoHammerOutline;
    case "challenge":
      return IoGolfOutline;
    default:
      return IoHelpOutline;
  }
}

type AchievementMetadata = {
  title: string;
  description: string;
  condition: string;
  icon: React.ComponentType<{ className?: string }>;
  bgClass: string;
  fgClass?: {
    text?: string;
    icon?: string;
  };
}

const achievementMetadataMap: Record<string, AchievementMetadata> = {
  "debug_achievement": {
    title: "Debug Achievement",
    description: "デバッグ用実績",
    condition: "このメッセージが 見れるのは おかしいよ",
    icon: IoHammerOutline, // TODO: Replace this
    bgClass: "bg-gray-700",
  },
};

export function getAchivementMetadata(achievementId: string) {
  return achievementMetadataMap[achievementId];
}
