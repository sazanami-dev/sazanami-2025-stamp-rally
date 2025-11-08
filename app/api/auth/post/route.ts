import { NextRequest, NextResponse } from "next/server";
import { resolveWaiting } from "@/services/auth/waiting";
import { verifyToken } from "@/services/auth/sign";

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("postAuth") !== "true") {
    return NextResponse.next();
  }
  if (!request.nextUrl.searchParams.get("state")) {
    // TODO: postAuthかつstateパラメータがないのは不正なのでエラーに飛ばす
  }

  const state = request.nextUrl.searchParams.get("state")!;
  const waiting = await resolveWaiting(state);

  const claims = await verifyToken(waiting.token!);

  const response = NextResponse.next();
  const expires = new Date(claims.exp * 1000); // JWTのexpクレームを使用して有効期限を設定
  response.cookies.set({
    name: "token",
    value: waiting.token!,
    httpOnly: true,
    secure: true,
    expires,
  });
  return response;
}
