import { NextRequest, NextResponse } from "next/server";
import { resolveWaiting } from "@/services/auth/waiting";
import { verifyToken } from "@/services/auth/sign";
import Logger from "@/lib/logger";

const logger = new Logger("api", "auth", "post");

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("postAuth") !== "true") {
    return NextResponse.next();
  }
  if (!request.nextUrl.searchParams.get("state")) {
    // TODO: postAuthかつstateパラメータがないのは不正なのでエラーに飛ばす
  }

  const state = request.nextUrl.searchParams.get("state")!;
  const waiting = await resolveWaiting(state);

  logger.info(`Post-auth processing for waiting id: ${waiting.id}`);
  logger.debug(`Resolved waiting: ${JSON.stringify(waiting)}`);

  const claims = await verifyToken(waiting.token!);

  const redirectUrl = request.nextUrl;
  redirectUrl.searchParams.delete("postAuth");
  redirectUrl.searchParams.delete("state");
  const response = NextResponse.redirect(redirectUrl.toString());
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

