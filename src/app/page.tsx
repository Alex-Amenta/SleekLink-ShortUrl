import Footer from "@/components/footer";
import FrequentQuestions from "@/components/frequent-questions";
import Hero from "@/components/hero";
import Statistics from "@/components/statistics";
import CustomizeUrl from "@/components/url-customize";
import UrlManager from "@/components/url-manager";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CustomizeUrl />
      <UrlManager />
      <Statistics />
      <FrequentQuestions />
      <Footer />
    </main>
  );
}
