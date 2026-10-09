import { site } from "../content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-stage">
        <div className="footer-word">
          <p className="footer-mark footer-mark-echo" aria-hidden="true">
            {site.footer.mark}
          </p>
          <p className="footer-mark">{site.footer.mark}</p>
        </div>
        <div className="footer-meta">
          <p>{site.footer.location}</p>
          <a href={site.footer.instagramUrl} target="_blank" rel="noopener noreferrer">
            {site.footer.instagramLabel}
          </a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.footer.termsPath}>{site.footer.termsLabel}</a>
        </div>
        <div className="footer-legal">
          <p>CNPJ: {site.footer.cnpj}</p>
          <p>{site.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
