import { useEffect, useId, useRef, useState } from "react";
import { rail, site } from "../content/site";
import { scrollToSection } from "../animations/scrollTo";
import { BrandLogo } from "./BrandLogo";

type MenuLink = {
  id: string;
  label: string;
  action: "section" | "chat";
};

const menuLinks: readonly MenuLink[] = [
  { id: "hero", label: "Início", action: "section" },
  ...rail.map((item) => ({ id: item.id, label: item.label, action: "section" as const })),
  { id: "contato", label: "Contato", action: "chat" },
];
const EXIT_MS = 280;

type MenuOverlayProps = {
  onClose: () => void;
  onChat: () => void;
};

type MenuExit = "close" | "chat" | { section: string };

export function MenuOverlay({ onClose, onChat }: MenuOverlayProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const exitTimer = useRef<number | null>(null);
  const leaving = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    closeRef.current?.focus();
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => setOpen(true));
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
      if (exitTimer.current !== null) {
        window.clearTimeout(exitTimer.current);
      }
    };
  }, []);

  const finish = (action: MenuExit) => {
    if (leaving.current) {
      return;
    }
    leaving.current = true;
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimer.current = window.setTimeout(() => {
      if (action === "chat") {
        onChat();
        return;
      }
      onClose();
      if (action !== "close") {
        window.setTimeout(() => {
          scrollToSection(action.section);
        }, 60);
      }
    }, reduced ? 0 : EXIT_MS);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        finish("close");
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onChat]);

  return (
    <div
      ref={panelRef}
      className={open ? "overlay menu-panel is-open" : "overlay menu-panel"}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="sr-only">
        Menu
      </h2>
      <div className="overlay-bar">
        <button ref={closeRef} type="button" className="text-button" onClick={() => finish("close")}>
          <CloseIcon />
          Close
        </button>
        <BrandLogo presentation="image" />
        <button type="button" className="text-button" onClick={() => finish("chat")}>
          {site.contact.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
      <nav aria-label="Menu">
        {menuLinks.map((link, index) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={(event) => {
              event.preventDefault();
              if (link.action === "chat") {
                finish("chat");
                return;
              }
              finish({ section: link.id });
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
