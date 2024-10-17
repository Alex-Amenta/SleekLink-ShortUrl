"use client";

import useModal from "@/hooks/useModal";
import Arrow19 from "./ui/icons/navigation/arrow-draw";
import { LinkIcon } from "lucide-react";
import NormalUrlModal from "./ui/modals/normal-url-modal";
import AnimatedContainer from "./ui/animations/animated-container";
import AnimatedItems from "./ui/animations/animated-items";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const customTransition = {
  when: "beforeChildren",
  staggerChildren: 0.2,
  duration: 0.3,
};

const Hero = () => {
  const { data: session } = useSession();
  const { isOpen, openModal, closeModal } = useModal("NormalUrlModal");

  const router = useRouter();

  const handleClick = () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      openModal();
    }
  };

  return (
    <AnimatedContainer
      transition={customTransition}
      className="flex flex-col justify-center items-center min-h-[calc(100vh-150px)]"
    >
      <AnimatedItems>
        <h1 className="sm:hidden text-6xl text-center text-pretty font-bold">
          Acorta y comparte links facilmente
        </h1>

        <h1 className="hidden sm:block text-6xl text-center text-pretty font-bold">
          Acorta tus links de manera elegante y comparte con facilidad
        </h1>
      </AnimatedItems>
      <AnimatedItems>
        <p className="hidden sm:block mt-6 text-base w-full text-center lg:w-[80%] lg:mx-auto text-black/65 dark:text-white/65">
          SleekLink es tu compañero perfecto para transformar URLs largas y
          complicadas en enlaces cortos y fáciles de compartir. ¡Simplemente
          pega tu URL, obtén tu enlace corto y compártelo con el mundo!
        </p>

        <p className="sm:hidden mt-6 text-base w-full text-center lg:w-[70%] lg:mx-auto text-black/65 dark:text-white/65">
          ¡Simplemente pega tu URL, obtén tu enlace corto y compártelo con el
          mundo!
        </p>
      </AnimatedItems>
      <AnimatedItems>
        <div className="my-10 flex justify-center items-center gap-7">
          <div>
            <Arrow19 />
          </div>
          <button
            onClick={handleClick}
            className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <span className="inline-flex align-middle mr-1">
              <LinkIcon size={20} />
            </span>
            Acortar URL
          </button>
        </div>
      </AnimatedItems>

      <NormalUrlModal isOpen={isOpen} onRequestClose={closeModal} />
    </AnimatedContainer>
  );
};

export default Hero;
