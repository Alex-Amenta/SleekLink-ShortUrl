"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  transition?: Transition;
  className: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const AnimatedContainer = ({
  transition,
  className,
  children,
  onClick,
}: AnimatedContainerProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 2 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transition || {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
