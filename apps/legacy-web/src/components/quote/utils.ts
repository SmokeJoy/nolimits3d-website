
export const formatWeight = (volume: number, density: number): string => {
  const weight = volume * density;
  if (weight < 0.1) {
    return '<0.1 g';
  } else if (weight < 1) {
    return `${weight.toFixed(1)} g`;
  } else {
    return `${Math.round(weight)} g`;
  }
};
