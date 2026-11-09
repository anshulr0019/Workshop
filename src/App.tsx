import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BreakdownHelp from "./components/BreakdownHelp";
import Services from "./components/Services";
import EngineStory from "./components/EngineStory";
import BookAppointment from "./components/BookAppointment";
import About from "./components/About";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import AskQuery from "./components/AskQuery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { LangProvider, useLang } from "./i18n";

function Page() {
  const { t } = useLang();
  return (
    <>
      <a href="#main" className="skip-link">
        {t("Skip to content")}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div className="brands">
          <div className="container brands-inner">
            <span>{t("MULTI-BRAND CAR CARE")}</span>
            <div>
              Maruti Suzuki <i /> Hyundai <i /> Tata <i /> Mahindra <i /> Toyota <i /> Honda <i /> Kia
            </div>
          </div>
        </div>
        <BreakdownHelp />
        <EngineStory />
        <Services />
        <BookAppointment />
        <About />
        <Reviews />
        <AskQuery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
