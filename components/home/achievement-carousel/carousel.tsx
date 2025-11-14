import AchievementCarouselItem from "./item";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";

type AchievementCarouselProps = {
  achievementIds: string[];
  openAchievementModal: (achievementId: string) => void;
}

export function AchievementCarousel(props: AchievementCarouselProps) {
  const { achievementIds, openAchievementModal } = props;
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "center",
  },
    [Autoplay()]
  );

  const achievementItemsWithUniqueId = useMemo(() => {
    return achievementIds.map((id, index) => ({
      key: `${id}_${index}`,
      achievementId: id,
    }));
  }, [achievementIds]);

  const handleItemClick = (achievementId: string) => {
    openAchievementModal(achievementId);
  }

  return <>
    <div className="overflow-hidden embla" ref={emblaRef}>
      <div className="flex pb-4 embla__container">
        {achievementItemsWithUniqueId.map((item) => (
          <div
            className="flex-shrink-0"
            key={item.key}
          >
            <AchievementCarouselItem achievementId={item.achievementId} onClick={handleItemClick} />
          </div>
        ))}
      </div>
    </div>
  </>
}
