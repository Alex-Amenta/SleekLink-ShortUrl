"use client";

import { motion } from "framer-motion";

const AnimatedScroll = ({ children }) => {
  const containerVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedScroll;
