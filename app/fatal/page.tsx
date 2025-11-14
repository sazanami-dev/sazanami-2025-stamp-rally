"use client";
import { Suspense, useMemo } from "react";
import { PiSealWarningDuotone, PiChatCenteredTextDuotone, PiCodeDuotone } from "react-icons/pi";
import { useSearchParams } from "next/navigation";

export default function FatalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FatalPageContent />
    </Suspense>
  );
}

function FatalPageContent() {
  const searchParams = useSearchParams();

  const { errorCode, errorMessage, errorDetail } = useMemo(() => {
    const code = searchParams.get("code");
    if (!code) {
      return {
        errorCode: "ERROR_DETAIL_NOT_PROVIDED",
        errorMessage: "不明なエラーが発生しました",
        errorDetail: "エラー情報は正しく提供されませんでした。",
      };
    }
    return {
      errorCode: code,
      errorMessage: searchParams.get("message"),
      errorDetail: searchParams.get("detail"),
    };
  }, [searchParams]);

  return <>
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <PiSealWarningDuotone className="text-6xl text-red-400 mb-4" />
      <div className="flex flex-col items-center py-4 w-full max-w-xl text-center">
        <p className="text-3xl pb-2">エラーが発生しました</p>
        {errorMessage && <p className="text-lg font-medium text-amber-600 pb-2">{errorMessage}</p>}
        <div className="mt-4 p-4 w-full bg-gray-100 rounded-lg text-left shadow-sm flex flex-col overflow-x-scroll" >
          {errorCode && (
            <div className="flex items-center gap-x-2 mb-3">
              <PiCodeDuotone className="text-xl text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 flex-1 min-w-0 break-all">
                {errorCode}
              </p>
            </div>
          )}

          {errorDetail && (
            <div className="flex items-center gap-x-2">
              <PiChatCenteredTextDuotone className="text-xl text-gray-500 flex-shrink-0" />
              <p className="text-gray-700 flex-1 min-w-0 break-all">
                {errorDetail}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </>;
}
