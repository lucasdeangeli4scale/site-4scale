import { useEffect, useRef, useState } from "react";
import { getLenis, scrollToSection } from "../animations/scrollTo";
import { site } from "../content/site";
import { BrandLogo } from "./BrandLogo";
import { MenuOverlay } from "./MenuOverlay";
import { ChatPanel } from "./ChatPanel";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen || chatOpen) {
      lenis?.stop();
      return () => {
        getLenis()?.start();
      };
    }
    lenis?.start();
    return undefined;
  }, [menuOpen, chatOpen]);

  const lastOpener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (menuOpen || chatOpen || !lastOpener.current) {
      return;
    }
    lastOpener.current.focus();
    lastOpener.current = null;
  }, [menuOpen, chatOpen]);

  return (
    <header className="header">
      <div className="header-side">
        <button
          ref={menuButtonRef}
          type="button"
          className="text-button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => {
            lastOpener.current = menuButtonRef.current;
            setChatOpen(false);
            setMenuOpen(true);
          }}
        >
          <MenuIcon />
          Menu
        </button>
      </div>
      <a
        className="brand"
        href="#hero"
        aria-label="4SCALE"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("hero");
        }}
      >
        <BrandLogo />
      </a>
      <div className="header-side header-end">
        <button
          ref={chatButtonRef}
          type="button"
          className="text-button"
          aria-expanded={chatOpen}
          aria-controls="site-chat"
          onClick={() => {
            lastOpener.current = chatButtonRef.current;
            setMenuOpen(false);
            setChatOpen(true);
          }}
        >
          {site.contact.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
      {menuOpen ? (
        <div id="site-menu">
          <MenuOverlay
            onClose={() => {
              setMenuOpen(false);
            }}
            onChat={() => {
              lastOpener.current = menuButtonRef.current;
              setMenuOpen(false);
              setChatOpen(true);
            }}
          />
        </div>
      ) : null}
      {chatOpen ? (
        <div id="site-chat">
          <ChatPanel
            onClose={() => {
              setChatOpen(false);
            }}
          />
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 18 12" width="22" height="15" aria-hidden="true">
      <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
