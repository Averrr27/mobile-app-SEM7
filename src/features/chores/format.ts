export function formatInterval(intervalDays: number): string {
  return intervalDays === 1 ? 'co 1 dzień' : `co ${intervalDays} dni`;
}
