import { motion } from 'framer-motion';

interface StatCardProps {
  icon: JSX.Element;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <motion.div
    className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    </div>
  </motion.div>
);

export default StatCard;