"use client";
import React from "react";
import { IconType } from "react-icons";
import { IoFastFoodOutline, IoHammerOutline, IoHelpOutline, IoGolfOutline } from "react-icons/io5";

type CategoryMetadata = {
  icon: IconType;
  bgClass: string;
  fgClass?: {
    text?: string;
    icon?: string;
  }
};

const categoryMetadataMap: Record<string, CategoryMetadata> = {
  "battle_on_game_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-green-200 to-green-600",
  },
  "normal_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-blue-200 to-blue-600",
  },
  "amusement_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-yellow-200 to-yellow-600",
  },
  "shopping_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-purple-200 to-purple-600",
  },
  "food_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-red-200 to-pink-600",
  },
  "sazanami_booth": {
    icon: IoHelpOutline, // TODO: アイコンを入れ替える
    bgClass: "bg-gradient-to-tr from-gray-200 to-gray-600",
  },
  "fallback": {
    icon: IoHelpOutline,
    bgClass: "bg-gradient-to-tr from-gray-400 to-gray-900",
    fgClass: {
      text: "text-white",
      icon: "text-white",
    },
  },
};

export function getCategoryMetadata(categoryId: string) {
  return categoryMetadataMap[categoryId] ?? categoryMetadataMap["fallback"];
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
  "placeholder": {
    title: "？？？？？",
    description: "未取得の実績です",
    condition: "実績が一定数以下の場合に表示されます",
    icon: imgIconFactory("/achievements/red_question_mark_3d.png", "Red Question Mark"),
    bgClass: "bg-gradient-to-tr from-gray-200 to-gray-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-0": {
    title: "0階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "0階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_0_3d.png", "Keycap 0"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-1": {
    title: "1階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "1階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_1_3d.png", "Keycap 1"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-2": {
    title: "2階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "2階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_2_3d.png", "Keycap 2"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-3": {
    title: "3階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "3階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_3_3d.png", "Keycap 3"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-4": {
    title: "4階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "4階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_4_3d.png", "Keycap 4"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-5": {
    title: "5階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "5階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_5_3d.png", "Keycap 5"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-6": {
    title: "6階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "6階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_6_3d.png", "Keycap 6"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "floor-master-7": {
    title: "7階マスター",
    description: "TODO:いい感じのテキスト",
    condition: "7階のチェックポイントの8割以上にチェックイン",
    icon: imgIconFactory("/achievements/keycap_7_3d.png", "Keycap 7"),
    bgClass: "bg-gradient-to-tr from-yellow-200 to-red-500",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "continuous-checkin": {
    title: "スルメ",
    description: "(´･ ～ ･`)",
    condition: "同じチェックポイントに連続してチェックイン",
    icon: imgIconFactory("/achievements/squid_3d.png", "Squid"),
    bgClass: "bg-gradient-to-br from-blue-200 to-blue-700",
  },
  "food-master": {
    title: "グルメマスター",
    description: "TODO:いい感じのテキスト",
    condition: "飲食カテゴリーのチェックポイントに一定数以上チェックイン",
    icon: imgIconFactory("/achievements/cupcake_3d.png", "Food Master"),
    bgClass: "bg-gradient-to-tr from-red-200 to-pink-600",
    fgClass: {
      text: "text-gray-800",
    },
  },
  "rapid-checkin": {
    title: "気分屋さん",
    description: "そういうときもある",
    condition: "前回のチェックインから3分以内にチェックイン",
    icon: imgIconFactory("/achievements/sparkles_3d.png", "Sparkles"),
    bgClass: "bg-gradient-to-tr from-purple-200 to-purple-700",
  },
  "fallback": {
    title: "フォールバック",
    condition: "何らかの理由で実績情報が取得できなかった場合に表示されます",
    description: "このメッセージが 見れるのは おかしいよ",
    icon: imgIconFactory("/achievements/melting_face_3d.png", "Melting Face"),
    bgClass: "bg-gradient-to-tr from-gray-400 to-gray-900",
  },
  "hello-world": {
    title: "ありぐにゃとごにゃいにゃす",
    description: "はじめてのチェックイン!",
    condition: "任意のチェックポイントに初めてチェックイン",
    icon: imgIconFactory("/achievements/cat_3d.png", "Cat"),
    bgClass: "bg-gradient-to-tr from-pink-100 to-pink-500",
  }
};

function imgIconFactory(src: string, alt: string): JSX.Element {
  return <img
    src={src}
    alt={alt}
    className="w-56 h-56 object-contain"
  />

}

export function getAchivementMetadata(achievementId: string) {
  return achievementMetadataMap[achievementId] ?? achievementMetadataMap["fallback"];
}
