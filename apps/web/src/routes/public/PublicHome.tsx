import { ArtSection } from './home/ArtSection';
import { AuthenticProofSection } from './home/AuthenticProofSection';
import { ClosingSection } from './home/ClosingSection';
import { ComingSoonSection } from './home/ComingSoonSection';
import { DiscoverySection } from './home/DiscoverySection';
import { EventsSection } from './home/EventsSection';
import { HeroSection } from './home/HeroSection';
import { ProfessionalServicesSection } from './home/ProfessionalServicesSection';
import { ProjectTimelineSection } from './home/ProjectTimelineSection';
import { TrustSection } from './home/TrustSection';

/**
 * Homepage (M-003 Sprint 1, TSK-M003-WEB-D1): ten sections, in the order
 * given by `NoLimits3D_Documentation_v0.96/04_Experience/03_Homepage_Wireframes.md`
 * (`DOC-UX-003`), requirements `HOME-F-001`..`010`. Each section is its own
 * component under `apps/web/src/routes/public/home/` and carries its own
 * `aria-labelledby` heading and `data-testid` (see the section components
 * for the placeholder-policy reasoning behind each one's content).
 */
export function PublicHome() {
  return (
    <div data-testid="route-boundary-public">
      <HeroSection />
      <AuthenticProofSection />
      <ProjectTimelineSection />
      <DiscoverySection />
      <ArtSection />
      <ProfessionalServicesSection />
      <TrustSection />
      <EventsSection />
      {/* Section 9: "PrintFlow" (HOME-F-010). See ComingSoonSection.tsx for
          why the component isn't named PrintFlowSection. */}
      <ComingSoonSection />
      <ClosingSection />
    </div>
  );
}
