class BaseCustomError extends Error {
  public userNotice?: string;
  public ERROR_CODE?: string;
  constructor(message: string, extra?: { userNotice?: string, errorCode?: string }) {
    super(message);
    this.name = "BaseCustomError";
    if (extra) {
      if (extra.userNotice) {
        this.userNotice = extra.userNotice;
      }
      if (extra.errorCode) {
        this.ERROR_CODE = extra.errorCode;
      }
    }
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  setUserNotice(userNotice: string) {
    this.userNotice = userNotice;
  }

  setErrorCode(errorCode: string) {
    this.ERROR_CODE = errorCode;
  }

  getErrorCode(): string | undefined {
    return this.ERROR_CODE;
  }
  getUserNotice(): string | undefined {
    return this.userNotice;
  }
}

export { BaseCustomError };
