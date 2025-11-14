"use client";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { TbCheck } from "react-icons/tb";
import { useRouter } from "next/navigation";


export default function CheckinComplete({ achieved: _achieved }: { achieved: string[] }) {
  const router = useRouter();

  return <>
    <Card className="w-[90%] max-w-[24em]">
      <CardBody className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <TbCheck className="text-8xl text-green-500 py-6" />
          <p className="text-xl py-1">チェックインしました！</p>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg my-4 animate-bounce"
            onPress={() => router.push("/")}
          >
            ホームに戻る
          </Button>
        </div>
      </CardBody>
    </Card>
  </>
}
