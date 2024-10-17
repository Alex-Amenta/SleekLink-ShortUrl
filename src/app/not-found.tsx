"use client";

import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="size-full text-center space-y-2 mt-10 ">
      <h3 className="text-[12rem] font-bold tracking-widest -mb-8 ">404</h3>
      <p className="text-lg">Oops! page not found</p>
      <p className="text-sm dark:text-white/70 text-black/70">
        Please come back to Home
      </p>
      <button
        onClick={() => router.push("/")}
        className="shadow-md p-2 px-4 text-white dark:text-black bg-black dark:bg-white rounded-md dark:hover:bg-white/70 hover:bg-black/80 transition"
      >
        Come back
      </button>
    </div>
  );
};

export default Custom404;
