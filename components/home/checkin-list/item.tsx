import { Card, CardFooter, CardHeader } from "@heroui/card"
import { FaClock } from "react-icons/fa"

type CheckinItemProps = {
}

export default function CheckinListItem(props: CheckinItemProps) {

  return <>
    <Card shadow="sm" className="w-full max-w-md mx-auto my-4">
      <CardHeader className="flex gap-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex flex-col">
          <span className="font-semibold text-xl">デバッグ用チェックポイントあああああああああああああ</span>
        </div>
        <div className="ml-auto mr-2 flex items-center">
          <FaClock className="text-4xl mt-4 mb-4" />
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center p-2 bg-gray-100 rounded-b-lg">
        <div className="flex gap-2 items-center ml-2">
          <FaClock className="text-xs text-gray-500" />
          <p className="text-sm text-gray-500">Placeholder Location</p>
        </div>
        <p className="text-sm text-gray-500 mr-2">✅️終了済み</p>
      </CardFooter>
    </Card>
  </>
}
