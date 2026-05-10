"use client";
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const activities = [
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: 'Completed Franchise Setup',
    date: '2026-05-10',
    description: 'Successfully completed the setup process for new franchise.'
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    title: 'Attention Required',
    date: '2026-05-08',
    description: 'Franchise activation requires additional documentation.'
  },
  {
    icon: <Clock className="w-5 h-5 text-blue-500" />,
    title: 'Waiting for Approval',
    date: '2026-05-05',
    description: 'Franchise application is pending review.'
  }
];

const ActivityTimeline = () => (
  <div className="space-y-8">
    {activities.map((activity, i) => (
      <motion.div
        key={i}
        className="flex gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <div className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50">
            {activity.icon}
          </div>
          {i < activities.length - 1 && (
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{activity.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.date}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{activity.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default ActivityTimeline;