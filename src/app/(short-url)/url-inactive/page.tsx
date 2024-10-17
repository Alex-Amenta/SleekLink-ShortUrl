"use client";

import CardPulseBorder from "@/components/ui/card-pulse-border";
import { UnlinkIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UrlInactivePage = () => {
  const router = useRouter();

  const handleClickBack = () => {
    return router.push("/");
  };

  return (
    <section className="mt-10 min-h-screen ">
      <CardPulseBorder viaColor="via-red-500">
        <div className="space-y-3 rounded-md p-6">
          <h3 className="font-bold text-3xl">
            <span className="inline-flex align-middle">
              <UnlinkIcon />
            </span>{" "}
            Url Inactiva...
          </h3>
          <p className="dark:text-white/70 text-black/70">
            Lo sentimos esta url esta inactiva 😥...
          </p>
          <p className="dark:text-white/70 text-black/70">
            Podes volver activarla antes de que se elimine en 10 dias!
          </p>
          <button
            onClick={handleClickBack}
            className="p-1 px-4 bg-red-700 hover:bg-red-800 rounded-md text-white"
          >
            <span className="inline-flex align-middle mr-1">
              <ArrowLeftIcon size={20} />
            </span>
            Volver
          </button>
        </div>
      </CardPulseBorder>
    </section>
  );
};

export default UrlInactivePage;
