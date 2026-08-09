// Indicative project-scale estimator. Disabled until Elpis approves real
// baseline rates, size thresholds and multipliers — until then this must
// never produce a public-facing figure. See ELPIS_PROJECT_ASSESSMENT_SPEC.md
// section 6.
export type EstimateConfig = {
  enabled: boolean;
  baseBySize: Record<string, [number, number]>;
  transformationMultiplier: Record<string, [number, number]>;
  serviceAdjustments: Record<string, [number, number]>;
};

export const estimateConfig: EstimateConfig = {
  enabled: false,
  baseBySize: {},
  transformationMultiplier: {},
  serviceAdjustments: {},
};
