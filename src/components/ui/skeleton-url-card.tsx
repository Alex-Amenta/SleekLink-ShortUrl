import { Skeleton } from "./skeleton";

const SkeletonUrlCard = () => {
  return (
    <div className="mt-5 grid grid-cols-2 grid-rows-4 md:grid-cols-3 md:grid-rows-5 gap-4 h-auto">
      {/* Primera Card */}
      <Skeleton className="h-60 md:row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10" />

      {/* Segunda Card */}
      <Skeleton className="h-60 md:row-span-2 flex flex-col justify-between items-start rounded-md p-4 bg-black/10 dark:bg-white/10" />

      {/* Tercera Card */}
      <Skeleton className="h-60 max-md:col-span-2 md:row-span-2 flex flex-col justify-start space-y-5 items-start rounded-md p-4 bg-black/10 dark:bg-white/10" />

      {/* Cuarta Card */}
      <Skeleton className="rounded-md col-span-2 row-span-2 row-start-3 md:col-span-3 md:row-span-3 md:row-start-3 p-4 bg-black/10 dark:bg-white/10 w-full h-full overflow-hidden" />
    </div>
  );
};

export default SkeletonUrlCard;
