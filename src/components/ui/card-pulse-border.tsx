"use client";

import { motion } from "framer-motion";
import { ChildrenProps } from "$/types";

interface CardPulseBorderProps extends ChildrenProps {
  viaColor?: string;
}

const CardPulseBorder = ({
  children,
  viaColor = "via-black dark:via-white",
}: CardPulseBorderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-10  w-full "
    >
      <div className="absolute top-0 flex w-full justify-center">
        <div
          className={`left-0 h-[1px] animate-borderWidth rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] ${viaColor} to-[rgba(17,17,17,0)] transition-all duration-1000`}
        />
      </div>
      <div className="rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-[#131313] p-3 shadow-lg">
        {children}
      </div>
    </motion.div>
  );
};

export default CardPulseBorder;
