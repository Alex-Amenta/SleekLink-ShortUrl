"use client";

import { ClicksOverTimeChart } from "@/components/graphics/clicks-overtime";
import PulseLoader from "@/components/ui/loader/pulse-loader";
import SkeletonUrlCard from "@/components/ui/skeleton-url-card";
import TooltipUrl from "@/components/ui/tooltip-url";
import { calculateDaysReamiming, formatDate } from "@/helpers/formatDate";
import { useUrlStore } from "@/zustand/store";
import {
  AlarmClockIcon,
  MousePointerClickIcon,
  SproutIcon,
} from "lucide-react";
import { useEffect } from "react";

interface UrlDetailsPageProps {
  params: {
    urlId: string;
  };
}

const UrlDetailsPage = ({ params }: UrlDetailsPageProps) => {
  const { urlId } = params;
  const { getUrlById, selectedUrl, loading } = useUrlStore();

  useEffect(() => {
    const fetchData = async () => {
      await getUrlById(urlId);
    };

    fetchData();
  }, [urlId]);

  return (
    <section className="min-h-screen my-16">
      <div className="bg-white dark:bg-[#131313] rounded-md p-4">
        {loading ? (
          <SkeletonUrlCard />
        ) : (
          selectedUrl && (
            <div key={selectedUrl.id}>
              <h3 className="font-bold text-xl">
                <span className="inline-flex align-middle">
                  <PulseLoader isActive={selectedUrl.active} />
                </span>
                {selectedUrl.title}
              </h3>

              <article className="mt-5 grid grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-5 gap-4">
                {/* Primera Card */}
                <div className="md:row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/5 dark:bg-white/5">
                  <div className="flex justify-between items-center w-full ">
                    <p className="text-black/80 dark:text-white/80">
                      Clicks totales
                    </p>
                    <p>
                      <MousePointerClickIcon />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-4xl">
                      {selectedUrl.countClick}
                    </p>
                    <p className="text-sm ml-1">clicks</p>
                  </div>
                </div>

                {/* Segunda Card */}
                <div className="md:row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/5 dark:bg-white/5">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-black/80 dark:text-white/80">
                      Clicks totales
                    </p>
                    <p>
                      <MousePointerClickIcon />
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-4xl">
                      {selectedUrl.countClick}
                    </p>
                    <p className="text-sm ml-1">clicks</p>
                  </div>
                </div>

                {/* Tercera Card */}
                <div className="max-md:col-span-2 md:row-span-2 flex flex-col justify-start space-y-5 items-start rounded-md p-4 bg-black/5 dark:bg-white/5 text-sm">
                  <TooltipUrl
                    textHover={"ShortUrl"}
                    content={selectedUrl.shortUrl}
                  />
                  <TooltipUrl
                    textHover={"OriginalUrl"}
                    content={selectedUrl.originalUrl}
                  />
                  <p className="bg-green-300 dark:bg-green-950 rounded-full p-1 px-3">
                    <span className="inline-flex align-middle mr-1">
                      <SproutIcon
                        size={16}
                        className="text-green-900 dark:text-green-300"
                      />
                    </span>
                    <span className="text-green-800 dark:text-green-400">
                      {formatDate(selectedUrl.createdAt)}
                    </span>
                  </p>
                  <p className="bg-red-200 dark:bg-red-950 text-red-500 p-1 px-3 rounded-full">
                    <span className="inline-flex align-middle mr-1">
                      <AlarmClockIcon size={16} />
                    </span>
                    {calculateDaysReamiming(selectedUrl.expirationDate)} days
                  </p>
                </div>

                {/* Cuarta Card */}
                <div className="rounded-md col-span-2 row-span-2 row-start-3 md:col-span-3 md:row-span-3 md:row-start-3 p-4 bg-black/5 dark:bg-white/5 w-full h-full overflow-hidden">
                  <ClicksOverTimeChart urlId={selectedUrl.id} />
                </div>
              </article>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default UrlDetailsPage;
