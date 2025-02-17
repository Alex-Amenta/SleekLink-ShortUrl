"use client";

import { useUrlStore } from "@/zustand/store";
import UrlCard from "./url-card";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Url } from "$/types/url";

const UrlManager = () => {
  const { updateStatusUrl, nonAuthUrls, fetchAnonymousUrls } = useUrlStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      fetchAnonymousUrls();
    }
  }, [session, fetchAnonymousUrls]);

  return (
    <>
      {!session &&
        nonAuthUrls.length > 0 &&
        nonAuthUrls.map((url: Url) => (
          <UrlCard
            key={url.id}
            id={url.id}
            title={url.title}
            originalUrl={url.originalUrl}
            shortUrl={url.shortUrl}
            countClick={url.countClick}
            createdAt={url.createdAt}
            active={url.active}
            expirationDate={url.expirationDate}
            updateStatusUrl={updateStatusUrl}
          />
        ))}
    </>
  );
};

export default UrlManager;
