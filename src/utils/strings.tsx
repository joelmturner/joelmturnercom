export function getDateString(rawDate: number): string {
  return new Date(rawDate).toLocaleDateString();
}
