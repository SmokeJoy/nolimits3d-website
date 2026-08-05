import { FutureFeatureNotice } from '../FutureFeatureNotice';

/**
 * `/realizza/configuratore-lanterne` -- "Come potrebbe apparire la mia
 * lanterna?" (`DOC-UX-001`). Task packet item 9: future 3D configurator,
 * not faked -- no mock 3D preview or configuration controls. See
 * `FutureFeatureNotice`.
 */
export function ConfiguratoreLanternePage() {
  return (
    <FutureFeatureNotice
      question="Come potrebbe apparire la mia lanterna?"
      featureLabel="Il configuratore lanterne"
    />
  );
}
