import { BaseCustomError } from "./base";

class NetworkFetchError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "NetworkFetchError";
    if (!extra?.userNotice) {
      this.setUserNotice("ネットワークからデータを取得できませんでした。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("NETWORK_FETCH_ERROR");
    }
    Object.setPrototypeOf(this, NetworkFetchError.prototype);
  }
}

export { NetworkFetchError };
