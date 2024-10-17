"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

const useExpirationWarning = (urls) => {
  useEffect(() => {
    const expiredUrl = urls.filter(
      (url) => new Date(url.expirationDate) < new Date()
    );
    if (expiredUrl.length > 0) {
      toast.warning(
        "You have one or more URLs that have expired and will be deleted in 10 days if not reactivated."
      );
    }
  }, [urls]);
};

export default useExpirationWarning;
