"use client";

import HashUrlModal from "@/components/ui/modals/hash-url-modal";
import Loader from "@/components/ui/loader/loader";
import NormalUrlModal from "@/components/ui/modals/normal-url-modal";
import UrlCard from "@/components/url-card";
import useExpirationWarning from "@/hooks/useExpirationWarning";
import useFetchUrls from "@/hooks/useFetchUrls";
import useModal from "@/hooks/useModal";
import { useUrlStore } from "@/zustand/store";
import { LinkIcon, PlusCircle } from "lucide-react";
import { useCallback } from "react";

const DashboardPage = () => {
  const { loading, searchTerm, setSearchTerm, filteredUrls, updateStatusUrl } =
    useUrlStore();

  const {
    isOpen: isNormalOpen,
    openModal: openNormalModal,
    closeModal: closeNormalModal,
  } = useModal("NormalUrlModal");
  const {
    isOpen: isHashOpen,
    openModal: openHashNormal,
    closeModal: closeHashModal,
  } = useModal("HashUrlModal");

  const urls = useFetchUrls();
  useExpirationWarning(urls);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );

  const filtered = filteredUrls();

  return (
    <section className="min-h-screen my-16">
      {loading ? (
        <div className="mt-40 flex justify-center items-center">
          <Loader className="text-4xl" />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap justify-start md:justify-center items-center gap-4">
            <input
              className="flex-1 p-2 border-2 dark:border-white/20 rounded-md"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Url"
            />
            <p className="p-2 border-2 dark:border-white/20 rounded-md bg-white dark:bg-[#131313]">
              <span className="inline-flex align-middle mr-1">
                <LinkIcon size={20} />
              </span>
              {`${urls.length}/15`}
            </p>
            <button
              onClick={openNormalModal}
              className="p-2 border-2 dark:border-white/20 rounded-md text-white bg-green-500 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900"
            >
              <PlusCircle />
            </button>
            <button
              onClick={openHashNormal}
              className="p-2 border-2 dark:border-white/20 rounded-md text-white bg-violet-500 hover:bg-violet-700 dark:bg-violet-800 dark:hover:bg-violet-900"
            >
              <PlusCircle />
            </button>
          </div>
          {filtered.length > 0 ? (
            filtered.map((url) => (
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
            ))
          ) : (
            <div className="my-5 flex flex-col justify-center items-center py-20 px-4 rounded-md bg-white dark:bg-[#131313] dark:border-white/20 border  shadow-lg">
              <p className="text-center text-xl font-bold">
                Todavía no tienes URLs...
              </p>
            </div>
          )}
        </div>
      )}

      {isNormalOpen && (
        <NormalUrlModal
          isOpen={isNormalOpen}
          onRequestClose={closeNormalModal}
        />
      )}
      {isHashOpen && (
        <HashUrlModal isOpen={isHashOpen} onRequestClose={closeHashModal} />
      )}
    </section>
  );
};

export default DashboardPage;
