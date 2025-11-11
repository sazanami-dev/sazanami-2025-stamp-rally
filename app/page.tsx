"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchCategories, fetchUserCheckins } from "./actions";
import CheckinList from "@/components/home/checkin-list/list";

export default function Home() {
  const [checkins, setCheckins] = useState<Array<any>>([]);

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
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-amber-200">
        <h1 className="text-3xl font-bold mt-8">チェックイン履歴dbg</h1>
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
    </>
  );
}
