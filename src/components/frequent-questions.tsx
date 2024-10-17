import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedScroll from "./ui/animations/animated-scroll";
import { QUESTIONS } from "@/constants/questions";

const FrequentQuestions = () => {
  return (
    <AnimatedScroll>
      <section className="my-32">
        <h2 className="text-3xl font-bold mb-5">Preguntas Frecuentes(FAQ) </h2>
        <Accordion type="single" collapsible>
          {QUESTIONS.map((q, index) => (
            <AccordionItem key={index} value={q.item}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent className="leading-7 bg-black/10 p-2 rounded-md text-black/80 dark:text-white/80 dark:bg-white/10">
                {q.answer}{" "}
                {q.link && (
                  <a
                    className="font-semibold hover:underline"
                    target="_blank"
                    href={q.link}
                  >
                    Enviar mensaje!
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </AnimatedScroll>
  );
};

export default FrequentQuestions;
