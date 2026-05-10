"use client";
import { motion } from 'framer-motion';
import { Medal, Award, Trophy } from 'lucide-react';

const achievements = [
  {
    icon: <Medal className="w-6 h-6" />,
    title: 'Top Performer',
    description: 'Achieved top performer status for Q1 2026'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Innovation Award',
    description: 'Received the innovation award for franchise optimization'
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Leadership Excellence',
    description: 'Recognized for leadership in franchise development'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const AchievementBadges = () => (
  <motion.div
    className="grid gap-6 md:grid-cols-3"
    variants={container}
    initial="hidden"
    animate="show"
  >
    {achievements.map((achievement, i) => (
      <motion.div
        key={i}
        className="p-6 bg-white rounded-2xl shadow-sm border border-black/5"
        variants={card}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-[#FFCF40]/20 flex items-center justify-center text-[#FF5C1A]">{achievement.icon}</div>
          <h3 className="text-lg font-bold text-[#111]">{achievement.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{achievement.description}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default AchievementBadges;