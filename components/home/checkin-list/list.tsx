"use client";

import { Category, Checkin, Checkpoint } from "@prisma/client";
import CheckinListItem from "./item";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CheckinListProps = {
  checkins: Array<{
    checkIn: Checkin;
    checkpoint: Checkpoint;
  }>;
  context: {
    categories: Category[];
  }
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
  const { categories } = context;

  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((category) => {
      map[category.id] = category;
    });
    return map;
  }, [categories]);

  const listItems = useMemo(() => {
    return checkins.map(({ checkIn, checkpoint }) => {
      let cooldownDuration;
      if (checkpoint.cooldownDurationOverride) {
        cooldownDuration = checkpoint.cooldownDurationOverride;
      } else {
        const category = categoryMap[checkpoint.categoryId];
        cooldownDuration = category ? category.cooldownDuration : 0;
      }

      const cooldownEndTime = new Date(checkIn.createdAt.getTime() + cooldownDuration * 60000);

      return {
        id: checkIn.id,
        displayName: checkpoint.displayName,
        // positionDescription: checkpoint.positionDescription || undefined, 
        // message: checkIn.message || undefined,
        checkinDate: checkIn.createdAt,
        categoryId: checkpoint.categoryId,
        cooldownEndTime: cooldownEndTime,
      }
    });
  }, [checkins, categoryMap]);

  return <>
    <LayoutGroup>
      <div className="flex flex-col gap-1 mt-4">
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

    </LayoutGroup>

  </>
}
