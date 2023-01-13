import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
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

// function to replace spaces with hyphens
// and convert everything to lowercase
export function slugify(string: string) {
  if (!_isString(string) || _isEmpty(string)) {
    return '';
  }

  return _get(string, 'toString', () => string)
    .call(string)
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
