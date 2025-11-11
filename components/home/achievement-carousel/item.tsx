import { Card, CardBody, CardFooter } from "@heroui/card";
import { getAchivementMetadata } from "@/lib/front/mappers";


export default function AchievementCarouselItem() {

  return <>
    <Card
      isFooterBlurred
      radius="lg"
      className="" // TODO
      isPressable
      onPress={() => {
        alert("Not implemented yet");
      }}>

      <CardBody className="p-4 flex items-center justify-center bg-gradient-to-tr from-cyan-200 to-blue-600 rounded-lg relative">
        {/* ここにバッジになる画像がはいる */}
        {/* 仮置きで適当な画像 */}
        <img
          src="/achievements/placeholder.png"
          alt="Achievement Badge"
          className="w-56 h-56 object-contain"
        />
      </CardBody>
      <CardFooter
        className="justify-between py-2 absolute font-bold bottom-0 w-full shadow-small z-10 text-lg">
        <p className="text-sm text-center w-full">テストタイトル</p>
      </CardFooter>
    </Card>
  </>
}
