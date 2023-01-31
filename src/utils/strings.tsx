export function getDateString(rawDate: number): string {
  return new Date(rawDate).toLocaleDateString();
}

export function isCloudinaryUrl(url: string): boolean {
  return url?.includes('res.cloudinary.com') ?? false;
}
