import { siteContact } from '../navigation';
import { PageLayout } from './PageLayout';

/**
 * `/nolimits3d/contatti` -- "Come posso parlare direttamente con Andrea?"
 * (`DOC-UX-001`). Per the task packet (item 4), this page is NOT
 * placeholder: it reuses the real, already-verified contact details from
 * `navigation.ts`'s `siteContact` -- the same source `Footer.tsx` already
 * renders, verified byte-for-byte against `apps/legacy-web` in Sprint 1 --
 * with direct `mailto:`/`tel:` links. A contact form is explicitly out of
 * scope: no backend exists in this milestone.
 */
export function ContattiPage() {
  return (
    <PageLayout>
      <p className="home-section__lede">
        Parla direttamente con Andrea via email o telefono. Il laboratorio è operativo ma privato,
        non aperto al pubblico (vedi la pagina Eventi per le occasioni di incontro dal vivo).
      </p>
      <address className="content-page__contact">
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
    </PageLayout>
  );
}
