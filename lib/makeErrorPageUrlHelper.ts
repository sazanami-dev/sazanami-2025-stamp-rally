import { ServerEnvKey, ServerEnvUtil } from "./serverEnv";

export function makeErrorPageUrlHelper(
  code: string,
  message?: string,
  detail?: string
): string {
  let baseUrl = "";
  // サーバーサイドで動作している場合、環境変数からベースURLを取得
  if (typeof window === "undefined") {
    baseUrl = ServerEnvUtil.get(ServerEnvKey.BASE_URL);
  } else {
    // クライアントサイドで動作している場合、現在のホストを使用
    baseUrl = window.location.origin;
  }

  const errorPagePath = "/error";

  const url = new URL(errorPagePath, baseUrl);
  url.searchParams.append("code", code);
  if (message) {
    url.searchParams.append("message", message);
  }
  if (detail) {
    url.searchParams.append("detail", detail);
  }

  return url.toString();
}
