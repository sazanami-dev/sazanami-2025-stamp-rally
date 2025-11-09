"use client";
import CheckinWait from "@/components/checkin/wait";
import CheckinError from "@/components/checkin/error";
import CheckinComplete from "@/components/checkin/complete";
import { useEffect, useState } from "react";
import { processCheckInWrapper } from "./actions";

export default function CheckinPage() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const checkpointId = searchParams.get('ptid');

  const [activeState, setActiveState] = useState<'waiting' | 'complete' | 'error'>('waiting');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorMessageDetail, setErrorMessageDetail] = useState<string | null>(null);
  const [achievedCheckpoints, setAchievedCheckpoints] = useState<Array<string>>([]);

  useEffect(() => {
    if (!checkpointId) {
      setActiveState('error');
      setErrorMessage('チェックポイントIDが指定されていません');
      return;
    }

    processCheckInWrapper(checkpointId).then((result) => {
      if (result.isSuccess) {
        setAchievedCheckpoints(result.achievedIds || []);
        setActiveState('complete');
      } else {
        setActiveState('error');
        setErrorMessage('チェックインに失敗しました');
      }
    }).catch((error) => {
      setActiveState('error');
      setErrorMessage('チェックイン中にエラーが発生しました');
      setErrorMessageDetail(error.message);
    });
  }, [checkpointId]);

  return <>
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 gap-6">
      {activeState === 'waiting' && <CheckinWait />}
      {activeState === 'error' && <CheckinError error={errorMessage} errorDetail={errorMessageDetail} />}
      {activeState === 'complete' && <CheckinComplete achieved={achievedCheckpoints} />}
    </div>
  </>
}
