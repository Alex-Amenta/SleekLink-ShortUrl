"use client";

import { useUrlStore } from "@/zustand/store";
import { useEffect } from "react";

const useFetchUrls = () => {
  const { urls, getUrlsByUserEmail } = useUrlStore();

  useEffect(() => {
    const fetchData = async () => {
      await getUrlsByUserEmail();
    };

    fetchData();
  }, [getUrlsByUserEmail]);

  return urls;
};

export default useFetchUrls;
