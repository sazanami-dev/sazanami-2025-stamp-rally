"use server";
import { getUserCheckinsIncludeCheckpointWithPagination } from "@/services/checkin";
import { getUserInfoFromCookies } from "@/lib/get-user-info";
import { getAllCategories } from "@/services/category";

export async function fetchUserCheckins(page: number) {
  const userInfo = await getUserInfoFromCookies();
  if (!userInfo || !userInfo.uid) {
    // TODO: 適切にハンドリングする
    throw new Error('Unauthorized access: invalid or missing token');
  }
  const pageSize = 20; // 1ページあたりのアイテム数
  const checkinData = await getUserCheckinsIncludeCheckpointWithPagination(userInfo.uid, page, pageSize);
  return checkinData;
}

export async function fetchCategories() {
  const categories = await getAllCategories();
  return categories;
}
