import { useRef, useState } from "react";
import { About } from "./components/About";
import { BlobBackground } from "./components/BlobBackground";
import { Cases } from "./components/Cases";
import { Clients } from "./components/Clients";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SectionRail } from "./components/SectionRail";
import { Services } from "./components/Services";
import { Team } from "./components/Team";
import { TermsPage } from "./components/TermsPage";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { useSiteScroll } from "./animations/useSiteScroll";

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("hero");
  useSiteScroll(rootRef, setActive);

  const isTerms = window.location.pathname === "/termos";

  return (
    <>
      {isTerms ? (
        <>
          <TermsPage />
          <WhatsAppButton />
        </>
      ) : (
        <div ref={rootRef} className="site">
          <a className="skip" href="#hero">
            Ir para o conteúdo
          </a>
          <Header />
          <SectionRail active={active} />
          <main className="site-main">
            <BlobBackground />
            <Hero />
            <About />
            <Services />
            <Cases />
            <Team />
            <Clients />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </>
  );
}
