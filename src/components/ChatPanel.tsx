import { useEffect, useId, useRef } from "react";
import { site } from "../content/site";
import { BrandLogo } from "./BrandLogo";
import { LeadForm } from "./LeadForm";

type ChatPanelProps = {
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([type='hidden']):not([disabled]):not([tabindex='-1'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
].join(", ");

export function ChatPanel({ onClose }: ChatPanelProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { panel } = site.contact;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(focusableSelector);
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
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="overlay chat-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="overlay-bar">
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          <CloseIcon />
          Close
        </button>
        <BrandLogo presentation="image" />
        <span />
      </div>
      <div className="chat-layout">
        <div className="chat-copy">
          <h2 id={titleId}>
            {panel.title} <span>{panel.titleAccent}</span>
          </h2>
          <p>{panel.body}</p>
          <ul className="chat-contacts">
            <li>
              <MailIcon />
              <div>
                <p>{panel.emailLabel}</p>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </div>
            </li>
            <li>
              <PinIcon />
              <div>
                <p>{panel.placeLabel}</p>
                <strong>{panel.place}</strong>
              </div>
            </li>
            <li>
              <PinIcon />
              <div>
                <p>{panel.addressLabel}</p>
                <strong>{panel.address}</strong>
              </div>
            </li>
            <li>
              <ChatIcon />
              <div>
                <p>{panel.whatsappLabel}</p>
                <a href={site.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {panel.whatsappAction}
                </a>
              </div>
            </li>
          </ul>
          <div className="chat-social">
            <a href={site.footer.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={site.footer.instagramLabel}>
              <InstagramIcon />
            </a>
            <a href={panel.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={panel.linkedinLabel}>
              <LinkedInIcon />
            </a>
            <a href={panel.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label={panel.youtubeLabel}>
              <YouTubeIcon />
            </a>
          </div>
        </div>
        <LeadForm />
      </div>
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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4.5 7l7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M6 16.5 4 20l4.2-1.4A8 8 0 1 0 6 16.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V16M8 8h.01M11.5 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3.5" y="7" width="17" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 10.2v3.6l3.2-1.8z" fill="currentColor" />
    </svg>
  );
}
