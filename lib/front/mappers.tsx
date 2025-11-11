import { IoFastFoodOutline, IoHammerOutline, IoHelpOutline, IoGolfOutline } from "react-icons/io5";

export function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case "food":
      return IoFastFoodOutline;
    case "debug":
      return IoHammerOutline;
    case "challenge":
      return IoGolfOutline;
    case "unknown":
      return IoHelpOutline;
  }
}

