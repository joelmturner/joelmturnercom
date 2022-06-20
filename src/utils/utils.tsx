// import slugifyFn from "@sindresorhus/slugify";

export const getImageStep = (index: number, arr: any[], direction: 'prev' | 'next') => {
  if (index === -1) {
    return null;
  }
  if (direction === 'next') {
    if (index < arr.length - 1) {
      return arr[index + 1];
    } else {
      return arr[0];
    }
  }
  if (direction === 'prev') {
    if (index > 0) {
      return arr[index - 1];
    } else {
      return arr[arr.length - 1];
    }
  }
};

// export function slugify(str: string, prefix?: string): string {
//   return prefix ? `${prefix}/${slugifyFn(str)}/` : slugifyFn(str);
// }
