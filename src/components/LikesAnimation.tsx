'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ACTIVITIES } from '../lib/constants';
import { useState } from 'react';
import { useInterval } from 'react-use';
import { Text } from './Text';

const VARIANTS = {
  enter: (direction: number) => {
    return {
      y: direction < 0 ? 40 : -40,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    };
  },
};

const TRANSITION = {
  ease: 'linear',
  opacity: { duration: 0.2 },
};

export function LikesAnimation() {
  const [activity, setActivity] = useState(ACTIVITIES[0]);

  useInterval(() => {
    setActivity((prev) => {
      const index = ACTIVITIES.findIndex((activityItem) => activityItem === prev);
      if (index + 1 > ACTIVITIES.length - 1) {
        return ACTIVITIES[0];
      } else {
        return ACTIVITIES[index + 1];
      }
    });
  }, 2000);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={activity}
        variants={VARIANTS}
        initial="enter"
        animate="center"
        transition={TRANSITION}
      >
        <Text textAlign="left" as={'span'} color="orange.9" lineHeight="0.8">
          {activity}
        </Text>
      </motion.div>
    </AnimatePresence>
  );
}
