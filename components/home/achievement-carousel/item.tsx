import { Card, CardBody, CardFooter } from "@heroui/card";
import { getAchivementMetadata } from "@/lib/front/mappers";
import { useMemo } from "react";

type AchievementCarouselItemProps = {
  achievementId: string;
  onClick?: (achievementId: string) => void;
}

export default function AchievementCarouselItem(props: AchievementCarouselItemProps) {
  const { achievementId } = props;

  const metadata = useMemo(() => {
    return getAchivementMetadata(achievementId);
  }, [achievementId]);
  return <>
    <Card
      isFooterBlurred
      radius="lg"
      className="embla__slide"
      isPressable
      onPress={() => {
        if (props.onClick) {
          props.onClick(achievementId);
        }
      }}>

      <CardBody className={`p-4 flex items-center justify-center ${metadata.bgClass}`}>
        {metadata.icon}
      </CardBody>
      <CardFooter
        className="justify-between py-2 absolute font-bold bottom-0 w-full shadow-small z-10 text-lg">
        <p className={`text-sm text-center w-full ${metadata.fgClass?.text ?? ""}`}>{metadata.title}</p>
      </CardFooter>
    </Card>
  </>
}
