import AchievementCarouselItem from "./item";
import useEmblaCarousel from "embla-carousel-react";
// import type { EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type AchievementCarouselProps = {
  achievementIds: string[];
  openAchievementModal: (achievementId: string) => void;
}

export function AchievementCarousel(props: AchievementCarouselProps) {
  const { achievementIds, openAchievementModal } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  },
    [Autoplay()]
  );
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const achievementItemsWithUniqueId = useMemo(() => {
    return achievementIds.map((id, index) => ({
      key: `${id}_${index}`,
      achievementId: id,
    }));
  }, [achievementIds]);

  const updateEdgeState = useCallback((api: any) => { // Workaround
    setIsAtStart(!api.canScrollPrev());
    setIsAtEnd(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    updateEdgeState(emblaApi);
    const handleSelect = () => updateEdgeState(emblaApi);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, updateEdgeState]);

  const handleItemClick = (achievementId: string) => {
    openAchievementModal(achievementId);
  }

  const carouselClassName = clsx("overflow-hidden embla edge-fade", {
    "edge-fade--none": isAtStart && isAtEnd,
    "edge-fade--right": isAtStart && !isAtEnd,
    "edge-fade--left": isAtEnd && !isAtStart,
    "edge-fade--both": !(isAtStart || isAtEnd),
  });

  return <>
    <div className={carouselClassName} ref={emblaRef}>
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
