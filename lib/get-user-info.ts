import { cookies } from "next/headers";
import { decodeToken } from "@/services/auth/token";

export async function getUserInfoFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const claims = token ? await decodeToken(token) : null;
  return claims;
}
