import { BaseCustomError } from "./base";

class DataNotFoundError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "DataNotFoundError";
    if (!extra?.userNotice) {
      this.setUserNotice("取得しようとしたデータはもはや存在しません。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("DATA_NOT_FOUND");
    }
    Object.setPrototypeOf(this, DataNotFoundError.prototype);
  }
}

class DataOperationError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "DataCreationError";
    if (!extra?.userNotice) {
      this.setUserNotice("データの作成に失敗しました。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("DATA_CREATION_ERROR");
    }
    Object.setPrototypeOf(this, DataOperationError.prototype);
  }
}

class DataValidationError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "DataValidationError";
    if (!extra?.userNotice) {
      this.setUserNotice("提供されたデータは無効です。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("DATA_VALIDATION_ERROR");
    }
    Object.setPrototypeOf(this, DataValidationError.prototype);
  }
}

class DataUnknownError extends BaseCustomError {
  constructor(message: string, extra?: { userNotice?: string; errorCode?: string }) {
    super(message, extra);
    this.name = "DataUnknownError";
    if (!extra?.userNotice) {
      this.setUserNotice("データ処理中に不明なエラーが発生しました。");
    }
    if (!extra?.errorCode) {
      this.setErrorCode("DATA_UNKNOWN_ERROR");
    }
    Object.setPrototypeOf(this, DataUnknownError.prototype);
  }
}

export { DataNotFoundError, DataValidationError, DataUnknownError, DataOperationError };
