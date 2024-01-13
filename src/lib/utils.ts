export function getAdjustedImageSize(size: number) {
  return Math.ceil(size * 1.14);
}

export function sanitizeId(id: string) {
    return id.replace(/[!"#$%&'()\*\+,\./:;<=>\?@\[\\\]^`{\|}~ ]+/g, '-');
}