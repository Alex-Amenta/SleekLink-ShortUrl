"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 2 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedItems = ({ children }: { children: React.ReactNode }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

export default AnimatedItems;
