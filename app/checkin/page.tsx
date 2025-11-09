"use client";
import CheckinWait from "@/components/checkin/wait";
import CheckinError from "@/components/checkin/error";
import CheckinComplete from "@/components/checkin/complete";
import { useState } from "react";

export default function CheckinPage() {
  // クエリパラメータからチェックポイントのIDを取得
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const checkpointId = searchParams.get('ptid');

  const [activeState, setActiveState] = useState<'waiting' | 'complete' | 'error'>('waiting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageDetail, setErrorMessageDetail] = useState<string | null>(null);
  const [achievedCheckpoints, setAchievedCheckpoints] = useState<Array<string>>([]);

  if (!checkpointId) {

  }

  // チェックポイントの存在確認
  // クールダウン中でないかを確認
  // チェックイン処理を試行

  return <>
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 gap-6">
      {activeState === 'waiting' ?
        <CheckinWait />
        : activeState === 'complete' ?
          <CheckinComplete achieved={achievedCheckpoints} />
          : activeState === 'error' ?
            <CheckinError error={errorMessage} errorDetail={errorMessageDetail} />
            : null
      }
    </div>
  </>
}
