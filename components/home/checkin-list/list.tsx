"use client";

import { Category, Checkin, Checkpoint } from "@prisma/client";
import CheckinListItem from "./item";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";

type CheckinListProps = {
  checkins: (Checkin & { checkpoint: Checkpoint })[];
  context: {
    categories: Category[];
    checkpoints: Checkpoint[];
  },
  loadMoreCallback: () => void;
}

type ListItem = {
  id: string;
  displayName: string;
  positionDescription?: string;
  message?: string;
  categoryId?: string;
  checkinDate: Date;
  cooldownEndTime: Date;
}

export default function CheckinList(props: CheckinListProps) {
  const { checkins, context } = props;
  const { categories, checkpoints } = context;

  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((category) => {
      map[category.id] = category;
    });
    return map;
  }, [categories]);

  const checkpointMap = useMemo(() => {
    const map: Record<string, Checkpoint> = {};
    checkpoints.forEach((checkpoint) => {
      map[checkpoint.id] = checkpoint;
    });
    return map;
  }, [checkpoints]);

  const listItems = useMemo(() => {
    return checkins.map(({ id, createdAt, checkpoint }) => {
      let cooldownDuration;
      if (checkpoint.cooldownDurationOverride) {
        cooldownDuration = checkpoint.cooldownDurationOverride;
      } else {
        const category = categoryMap[checkpoint.categoryId];
        cooldownDuration = category ? category.cooldownDuration : 0;
      }
      if (checkpointMap[checkpoint.id].cooldownDurationOverride !== null) {
      const cooldownEndTime = new Date(createdAt.getTime() + cooldownDuration * 60000);
      return {
        id: id,
        displayName: checkpoint.displayName,
        // positionDescription: checkpoint.positionDescription || undefined, 
        // message: message || undefined,
        checkinDate: createdAt,
        categoryId: checkpoint.categoryId,
        cooldownEndTime: cooldownEndTime,
      }
    });
  }, [checkins, categoryMap]);

  return <>
    <LayoutGroup>
      <div className="flex flex-col gap-4 w-full">
        <AnimatePresence>
          {listItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CheckinListItem
                checkpointName={item.displayName}
                // positionDescription={item.positionDescription}
                // message={item.message}
                categoryId={item.categoryId}
                checkinTime={item.checkinDate}
                cooldownEndTime={item.cooldownEndTime}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ページネーション とりあえずLoad moreボタン */}
      <Button
        className="w-full max-w-md mx-auto my-4"
        variant="light"
        onPress={() => {
          props.loadMoreCallback();
        }}
      >もっと読み込む</Button>

    </LayoutGroup>

  </>
}
