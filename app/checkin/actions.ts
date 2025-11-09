"use server";
import { cookies } from "next/headers";
import { decodeToken } from "@/services/auth/token";
import { recordCheckIn } from "@/services/checkin";
import { processAchievements } from "@/services/achievement";

export type CheckInResult = {
  isSuccess: boolean;
  achievedIds?: string[];
}

export async function processCheckInWrapper(checkpointId: string): Promise<CheckInResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const claims = token ? await decodeToken(token) : null;
  // そもそも検証はmiddlewareでやられている（ここにたどり着いている時点で有効なトークンを持っていないとおかしい）
  if (!token || !claims || !claims.uid) {
    // エラーページに飛ばす(そもそもありえない状況だけど)
    throw new Error('Unauthorized access: invalid or missing token');
  }
  const userId = claims.uid;
  const record = await recordCheckIn(userId, checkpointId);

  const achievedIds = await processAchievements(record.id);

  return {
    isSuccess: true,
    achievedIds,
  };
}
