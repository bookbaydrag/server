export function setExpiration(minutes: number): number {
  const now = Date.now();
  return now + (minutes * 60000);
}
