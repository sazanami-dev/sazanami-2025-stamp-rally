import CheckinWait from "@/components/checkin/wait";
import CheckinError from "@/components/checkin/error";
import CheckinComplete from "@/components/checkin/complete";

export default function CheckinPage() {
  // クエリパラメータからチェックポイントのIDを取得
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const checkpointId = searchParams.get('ptid');
  if (!checkpointId) {
    return ShowStateModalHelper(<CheckinError error="チェックポイントIDが指定されていません。" />);
  }

  // チェックポイントの存在確認
  // クールダウン中でないかを確認
  // チェックイン処理を試行

  return ShowStateModalHelper(<CheckinError error="不明なエラーが発生しました。" />);
}

function ShowStateModalHelper(node: React.ReactNode) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 gap-6">
      {node}
    </div>
  );
}
