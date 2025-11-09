import { BaseCustomError } from "./base";


class CommonError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "CommonError";
    if (!extra?.userNotice) {
      this.setUserNotice("何らかのエラーが発生しました。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("COMMON_ERROR");
    }
    Object.setPrototypeOf(this, CommonError.prototype);
  }
}

export { CommonError };
