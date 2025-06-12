export const EStatus = {
  loading: 'loading',
  idle: 'idle',
  failed: 'failed',
  succeeded: 'succeeded',
} as const;

export type EStatus = (typeof EStatus)[keyof typeof EStatus];
