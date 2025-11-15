import { NextRequest, NextResponse } from "next/server";
import { resolveWaiting, WaitingEntryExpiredError, WaitingEntryNotFoundError } from "@/services/auth/waiting";
import { decodeToken } from "@/services/auth/token";
import { makeErrorPageUrlHelper } from '@/lib/makeErrorPageUrlHelper';
import Logger from "@/lib/logger";
import { TokenClaims } from "@/types/schema/tokenClaims";
import { createUser, getUserById, isUserExists, updateUser } from "@/services/user";
import authApi from "@/services/auth/api";
import { User } from "@prisma/client";
import { ServerEnvKey, ServerEnvUtil } from "@/lib/serverEnv";

const logger = new Logger("api", "auth", "post");

export async function GET(request: NextRequest) {
  const isPostAuth = request.nextUrl.searchParams.get("postAuth") === "true";
  if (!isPostAuth) {
    return NextResponse.next();
  }

  const state = request.nextUrl.searchParams.get("state");
  const redirectTo = request.nextUrl.searchParams.get("redirectTo");
  const baseUrl = ServerEnvUtil.get(ServerEnvKey.BASE_URL);
  let claims: TokenClaims | null = null;
  let waiting: Awaited<ReturnType<typeof resolveWaiting>>;

  if (!state) {
    const errorPageUrl = makeErrorPageUrlHelper(
      "MISSING_STATE",
      "不正なリクエストです",
      "stateパラメータは必須です");
    return NextResponse.redirect(errorPageUrl);
  }

  try {
    waiting = await resolveWaiting(state);
  } catch (error) {
    logger.error(`Failed to resolve waiting entry for state ${state}: ${(error as Error).message}`);
    const code =
      error instanceof WaitingEntryExpiredError
        ? "WAITING_ENTRY_EXPIRED"
        : error instanceof WaitingEntryNotFoundError
          ? "WAITING_ENTRY_NOT_FOUND"
          : "WAITING_RESOLVE_FAILED";
    const errorPageUrl = makeErrorPageUrlHelper(
      code,
      "認証セッションが見つかりません",
      "再度ログインをやり直してください。");
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
    logger.info(`Fetched user info for uid: ${claims.uid} (displayName: ${res.data.displayName})`);
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
  } else {
    let user: User | null = null;
    try {
      user = await getUserById(claims.uid);
    } catch (error) {
      logger.error(`Error fetching user for uid: ${claims!.uid} - ${(error as Error).message}`);
      const errorPageUrl = makeErrorPageUrlHelper(
        "USER_FETCH_FAILED",
        "ユーザー情報の修正に失敗しました",
        "既存のユーザーアカウントの情報取得中にエラーが発生しました");
      return NextResponse.redirect(errorPageUrl);
    }
    if (!user) {
      logger.error(`User not found after existence check for uid: ${claims!.uid}`);
      const errorPageUrl = makeErrorPageUrlHelper(
        "USER_NOT_FOUND",
        "ユーザー情報の修正に失敗しました",
        "異常なユーザーデータが取得されました");
      return NextResponse.redirect(errorPageUrl);
    }
    if (user.generated && user.displayName !== userInfo.displayName) {
      try {
        await updateUser(claims.uid, {
          displayName: userInfo.displayName || "No name",
        });
      } catch (error) {
        logger.error(`Error updating user for uid: ${claims!.uid} - ${(error as Error).message}`);
        const errorPageUrl = makeErrorPageUrlHelper(
          "USER_UPDATE_FAILED",
          "ユーザー情報の修正に失敗しました",
          "情報更新中にエラーが発生しました");
        return NextResponse.redirect(errorPageUrl);
      }
    }
  }

  // const redirectUrl = request.nextUrl;
  const redirectUrl = redirectTo ? new URL(redirectTo) : new URL(baseUrl);
  redirectUrl.searchParams.delete("postAuth");
  redirectUrl.searchParams.delete("state");
  redirectUrl.searchParams.delete("redirectTo");
  const newUrl = new URL(baseUrl);
  newUrl.pathname = redirectUrl.pathname;
  newUrl.search = redirectUrl.search;
  const response = NextResponse.redirect(newUrl.toString());
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
