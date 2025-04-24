export const Severities = {
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Help: 'help',
  Primary: 'primary',
  Secondary: 'secondary',
  Contrast: 'contrast',
} as const;

export type Severity = typeof Severities[keyof typeof Severities];
