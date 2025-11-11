import AchievementCarouselItem from "./item";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";

type AchievementCarouselProps = {
  achievementIds: string[];
}

export function AchievementCarousel(props: AchievementCarouselProps) {
  const { achievementIds } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  },
    [Autoplay()]
  );

  // アチーブメントIDの中には重複があるので、idを生成してユニークにする
  const uniqueAchievementItems = useMemo(() => {
    return achievementIds.map((id, index) => ({
      key: `${id}_${index}`,
      achievementId: id,
    }));
  }, [achievementIds]);

  return <>
    <div className="overflow-hidden embla" ref={emblaRef}>
      <div className="flex pb-4 embla__container">
        {uniqueAchievementItems.map((item) => (
          <div
            className="flex-shrink-0"
            key={item.key}
          >
            <AchievementCarouselItem achievementId={item.achievementId} />
          </div>
        ))}
      </div>
    </div>
  </>
}
