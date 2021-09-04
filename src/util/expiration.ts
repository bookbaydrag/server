const STANDARD_TIMES = {
  THIRTY_DAYS: 43200,
  ONE_WEEK: 10080,
  ONE_DAY: 1440,
  ONE_HOUR: 60,
  FIFTEEN_MINUTES: 15,
};
export const DEFAULT_SESSION_EXPIRATION = STANDARD_TIMES.ONE_WEEK;

export function setExpiration(minutes: number): number {
  const now = Date.now();
  return now + (minutes * 60000);
}
