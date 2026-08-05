import { SectionLandingPage } from './SectionLandingPage';

/**
 * `/nolimits3d` -- section landing page. Same dead-link fix as `ServiziPage`:
 * `GlobalNav`/`Footer` have linked here since Sprint 2, but only the four
 * child pages were ever registered as routes. The lede is `DOC-UX-001`'s own
 * "Navigazione primaria candidata" bullet for NoLimits3D, verbatim.
 */
export function Nolimits3DPage() {
  return (
    <SectionLandingPage sectionHeading="NoLimits3D">
      <p className="home-section__lede">
        NoLimits3D: Andrea, laboratorio, metodo, qualità, FAQ e contatti.
      </p>
    </SectionLandingPage>
  );
}
