"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchUserAchievements, fetchUserCheckins } from "./actions";
import CheckinList from "@/components/home/checkin-list/list";
import AchievementCarouselItem from "@/components/home/achievement-carousel/item";
import { AchievementCarousel } from "@/components/home/achievement-carousel/carousel";
import AchievementDetailModal from "@/components/home/achievement-detail-modal";

export default function Home() {
  const [checkins, setCheckins] = useState<Array<any>>([]);
  const [achievementIds, setAchievementIds] = useState<Array<string>>([]);

  const [categories, setCategories] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState<boolean>(false);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | undefined>(undefined);

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

  const openAchievementModal = (achievementId: string) => {
    setSelectedAchievementId(achievementId);
    setIsAchievementModalOpen(true);
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex w-full max-w-4xl flex-col gap-6 items-stretch sm:items-center">
          <div className="w-full sm:max-w-3xl sm:mx-auto">
            <AchievementCarousel openAchievementModal={(id) => {
              openAchievementModal(id);
            }}
              achievementIds={["hello-world", "debug_achievement", "placeholder", "floor-master-0", "floor-master-1", "floor-master-2", "floor-master-3", "floor-master-4", "floor-master-5", "floor-master-6", "floor-master-7", "continuous-checkin", "food-master", "rapid-checkin", "fallback"]} />
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
      <AchievementDetailModal
        isOpen={isAchievementModalOpen}
        achievementId={selectedAchievementId}
        onClose={() => setIsAchievementModalOpen(false)}
      />
    </>
  );
}
