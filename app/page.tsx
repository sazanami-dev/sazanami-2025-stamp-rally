"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchUserAchievements, fetchUserCheckins } from "./actions";
import CheckinList from "@/components/home/checkin-list/list";
import AchievementCarouselItem from "@/components/home/achievement-carousel/item";
import { AchievementCarousel } from "@/components/home/achievement-carousel/carousel";

export default function Home() {
  const [checkins, setCheckins] = useState<Array<any>>([]);
  const [achievementIds, setAchievementIds] = useState<Array<string>>([]);

  const [categories, setCategories] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const appendCheckins = async (page: number = 1) => {
    if (page <= 1) setCheckins([]);
    const newCheckin = await fetchUserCheckins(page);
    setCheckins((prevCheckins) => [...prevCheckins, ...newCheckin.checkins]);
  };

  useEffect(() => {
    appendCheckins();
    fetchCategories().then((cats) => setCategories(cats));
    fetchUserAchievements().then((achs) => setAchievementIds(achs));
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-3xl mb-8 fade-edges-x">
            {/* <AchievementCarousel achievementIds={achievementIds} /> */}
            <AchievementCarousel achievementIds={["debug_achievement", "placeholder", "floor-master-0", "floor-master-1", "floor-master-2", "floor-master-3", "floor-master-4", "floor-master-5", "floor-master-6", "floor-master-7", "continuous-checkin", "food-master", "rapid-checkin", "fallback"]} />
          </div>
          <CheckinList
            checkins={checkins}
            context={{ categories }}
            loadMoreCallback={() => {
              const nextPage = currentPage + 1;
              setCurrentPage(nextPage);
              appendCheckins(nextPage);
            }}
          />
        </div>

      </div>
    </>
  );
}
