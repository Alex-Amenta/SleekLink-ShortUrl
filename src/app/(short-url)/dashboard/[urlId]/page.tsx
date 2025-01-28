// @ts-nocheck

import { getUrlById } from "@/actions/url";
import SkeletonUrlCard from "@/components/ui/skeleton-url-card";
import UrlDetailsContent from "@/components/url-detail-content";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface UrlDetailsPageProps {
  params: {
    urlId: string;
  };
}

const UrlDetailsPage = async ({ params }: UrlDetailsPageProps) => {
  const { urlId } = params;

  const url = await getUrlById(urlId);

  if (!url) return notFound();

  return (
    <section className="min-h-screen my-16">
      <div className="bg-white dark:bg-[#131313] rounded-md p-4">
        <Suspense fallback={<SkeletonUrlCard />}>
          <UrlDetailsContent urlData={url} />
        </Suspense>
      </div>
    </section>
  );
};

export default UrlDetailsPage;
