import CheckinWait from "@/components/checkin/wait";
import CheckinError from "@/components/checkin/error";
import CheckinComplete from "@/components/checkin/complete";

export default function CheckinPage() {
  return <>
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 gap-6">
      <p className="text-2xl">test components</p>
      <CheckinWait />
      <CheckinError error="サンプルエラーメッセージ" />
      <CheckinComplete achieved={[""]} />
    </div>
  </>
}
