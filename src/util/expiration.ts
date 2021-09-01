export const ONE_WEEK = 10080;

export function setExpiration(minutes: number): number {
  const now = Date.now();
  return now + (minutes * 60000);
}
