"use server";
import { getUserCheckinsIncludeCheckpointWithPagination } from "@/services/checkin";
import { getUserAchievements } from "@/services/achievement";
import { getUserInfoFromCookies } from "@/lib/get-user-info";
import { getAllCategories } from "@/services/category";

export async function fetchUserCheckins(page: number) {
  const userInfo = await getUserInfoFromCookies();
  if (!userInfo || !userInfo.uid) {
    // TODO: 適切にハンドリングする
    throw new Error('Unauthorized access: invalid or missing token');
  }
  const pageSize = 20; // 1ページあたりのアイテム数
  return getUserCheckinsIncludeCheckpointWithPagination(userInfo.uid, page, pageSize);
}

export async function fetchCategories() {
  const categories = await getAllCategories();
  return categories;
}

export async function fetchUserAchievements() {
  const userInfo = await getUserInfoFromCookies();
  if (!userInfo || !userInfo.uid) {
    // TODO: 適切にハンドリングする
    throw new Error('Unauthorized access: invalid or missing token');
  }
  const achievements = await getUserAchievements(userInfo.uid);
  return achievements;
}
