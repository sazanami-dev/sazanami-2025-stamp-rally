import { NextRequest, NextResponse } from "next/server";
import { resolveWaiting } from "@/services/auth/waiting";
import { decodeToken } from "@/services/auth/token";
import { makeErrorPageUrlHelper } from '@/lib/makeErrorPageUrlHelper';
import Logger from "@/lib/logger";
import { TokenClaims } from "@/types/schema/tokenClaims";
import { createUser, isUserExists } from "@/services/user";
import authApi from "@/services/auth/api";

const logger = new Logger("api", "auth", "post");

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state")!;
  const isPostAuth = request.nextUrl.searchParams.get("postAuth") === "true";
  const waiting = await resolveWaiting(state);
  let claims: TokenClaims | null = null;

  if (!isPostAuth) {
    return NextResponse.next();
  }
  if (!state) {
    const errorPageUrl = makeErrorPageUrlHelper(
      "MISSING_STATE",
      "認証の事後処理に失敗しました",
      "stateパラメータは必須です")
    return NextResponse.redirect(errorPageUrl);
  }

  logger.info(`Post-auth processing for waiting id: ${waiting.id}`);
  logger.debug(`Resolved waiting: ${JSON.stringify(waiting)}`);

  try {
    claims = await decodeToken(waiting.token!);
    if (!claims || !claims.uid) {
      throw new Error(); // 直後に拾うので
    }
  } catch (error) {
    const errorPageUrl = makeErrorPageUrlHelper(
      "INVALID_TOKEN",
      "無効なトークンです",
      "提供されたトークンの検証に失敗しました");
    logger.error(`Failed to decode token for waiting id: ${waiting.id} - ${(error as Error).message}`);
    return NextResponse.redirect(errorPageUrl);
  }

  const api = authApi();
  let userInfo: any;
  try {
    const res = await api.get(
      {
        path: '/i',
        headers: {
          Authorization: `Bearer ${waiting.token!}`,
        },
      });
    userInfo = res.data;
  } catch (error) {
    logger.error(`Failed to fetch user info for uid: ${claims!.uid} - ${(error as Error).message}`);
    const errorPageUrl = makeErrorPageUrlHelper(
      "USER_INFO_FETCH_FAILED",
      "ユーザー情報の取得に失敗しました",
      "認証サーバーからユーザー情報を取得できませんでした");

    return NextResponse.redirect(errorPageUrl);
  }


  if (!await isUserExists(claims.uid)) {
    try {
      await createUser({
        id: claims.uid,
        displayName: userInfo.displayName || "No name",
        generated: true,
      });
    } catch (error) {
      logger.error(`Error creating user for uid: ${claims!.uid} - ${(error as Error).message}`);
      const errorPageUrl = makeErrorPageUrlHelper(
        "USER_CREATION_FAILED",
        "ユーザーの生成に失敗しました",
        "新しいユーザーアカウントの生成中にエラーが発生しました");
      return NextResponse.redirect(errorPageUrl);
    }

    logger.success(`Created new user for uid: ${claims.uid}`);
  }

  const redirectUrl = request.nextUrl;
  redirectUrl.searchParams.delete("postAuth");
  redirectUrl.searchParams.delete("state");
  const response = NextResponse.redirect(redirectUrl.toString());
  const expires = new Date(claims.exp * 1000); // JWTのexpクレームを使用して有効期限を設定
  response.cookies.set({
    name: "token",
    path: "/",
    value: waiting.token!,
    httpOnly: true,
    expires,
  });

  logger.success(`User authenticated successfully, redirecting to: ${redirectUrl.toString()}`);

  return response;
}
