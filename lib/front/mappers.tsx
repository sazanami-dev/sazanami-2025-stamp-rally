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
  icon: JSX.Element;
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
    icon: imgIconFactory("/achievements/placeholder.png", "Debug Achievement Badge"),
    bgClass: "bg-gradient-to-tr from-gray-400 to-gray-900",
    fgClass: {
      text: "text-white",
    },
  },
};

function imgIconFactory(src: string, alt: string): JSX.Element {
  return <img
    src={src}
    alt={alt}
    className="w-56 h-56 object-contain"
  />

}

export function getAchivementMetadata(achievementId: string) {
  return achievementMetadataMap[achievementId];
}
