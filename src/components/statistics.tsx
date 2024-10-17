import Image from "next/image";
import ChartsContainer from "./graphics/charts-container";
import ArrowHearth from "./ui/icons/navigation/arrow-hearth";
import AnimatedScroll from "./ui/animations/animated-scroll";
import { dataStatistics } from "@/constants/data-statistics";

const Statistics = () => {
  return (
    <section className="my-44 relative">
      <div className="absolute top-0 left-0 size-72 blur-3xl bg-green-300 dark:bg-green-900 rounded-full opacity-70 -z-50 -inset-32"></div>
      <div className="absolute animate-pulse right-0 bottom-0 size-60 blur-3xl bg-green-300 dark:bg-green-900 rounded-full opacity-70 -z-50"></div>

      <AnimatedScroll>
        <h3 className="text-4xl text-start md:text-center font-bold">
          Monitorea el rendimiento de tus URLs con estadísticas de clics en
          tiempo real.
        </h3>
        <div className="mt-10 flex justify-start md:justify-center items-center flex-wrap gap-10 xl:gap-28">
          <ChartsContainer />
        </div>
      </AnimatedScroll>

      <AnimatedScroll>
        <article className="mt-28">
          <h4 className="text-4xl md:text-center font-semibold mb-4">
            Beneficios de usar URLs acortadas.
          </h4>

          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="mt-4 max-sm:mb-6 flex flex-col items-center gap-3 max-w-lg text-lg md:-rotate-3">
              <p className="text-black/80 dark:text-white/80">
                Aquí tienes un ejemplo de cómo una conversación sobre URLs
                acortadas puede ser más efectiva y clara.
              </p>
              <p className="text-black/80 dark:text-white/80">
                Al utilizar URLs más cortas, la comunicación es más directa y
                menos propensa a errores. Esto facilita compartir enlaces y
                mejora la experiencia del usuario.
              </p>
            </div>

            <Image
              className="aspect-auto"
              src="/conversation.webp"
              alt="Chat de whatsapp sobre sleeklink"
              width={440}
              height={380}
              loading="lazy"
            />
          </div>
        </article>
      </AnimatedScroll>

      <article className="mt-20 flex flex-wrap justify-center xl:justify-around items-center gap-16 relative">
        {dataStatistics.map(({ data, description }, index) => (
          <div
            key={index}
            className="border border-black/20 dark:border-white/20 bg-black/10 dark:bg-white/10 p-6 w-full md:w-[17rem] 
            shadow-md rounded-md text-black dark:text-white flex flex-col items-center justify-center opacity-90"
          >
            <ArrowHearth />
            <p className="mt-2 text-4xl font-bold">{data}</p>
            <p className="text-balance text-black/80 dark:text-white/80">
              {description}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Statistics;
