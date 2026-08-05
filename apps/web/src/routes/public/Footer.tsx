import { Link } from 'react-router-dom';

import { Badge } from '@atlas/ui';

import { footerOtherLinks, footerSitemapSections, siteContact } from './navigation';

/**
 * Structural site footer: the full public sitemap (`DOC-UX-001`), grouped by
 * the same six primary sections as the header, plus the sitemap entries that
 * sit outside those six sections and the real contact/legal links already
 * live on `apps/legacy-web` (reused per the M-003 charter -- contact
 * details are real and reusable, the marketing copy around them is not).
 *
 * No marketing copy. The `command` boundary is never linked here (see
 * `GlobalNav.tsx` for the same invariant, enforced identically).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <nav aria-label="Mappa del sito completa">
        <div className="site-footer__grid">
          {footerSitemapSections.map((section) => (
            <div key={section.to}>
              <h2 className="site-footer__heading">
                <Link to={section.to}>{section.heading}</Link>
              </h2>
              {section.links.length > 0 ? (
                <ul className="footer-sitemap__list">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div>
            <h2 className="site-footer__heading">Altro</h2>
            <ul className="footer-other__list">
              {footerOtherLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/printflow">PrintFlow</Link> <Badge variant="outline">Coming Soon</Badge>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer__heading">Contatti</h2>
            <address className="site-footer__contact">
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
              <a href={siteContact.phoneHref}>{siteContact.phone}</a>
              <span>
                {siteContact.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
            </address>
          </div>
        </div>
      </nav>

      <div className="site-footer__bottom">
        <p>&copy; {year} NoLimits3D. Tutti i diritti riservati.</p>
        {/* Real, already-live legal page on apps/legacy-web; not a route this
            app's router manages, so a plain cross-app link rather than
            react-router's Link. */}
        <a href={siteContact.legalHref}>Informazioni legali</a>
      </div>
    </footer>
  );
}
