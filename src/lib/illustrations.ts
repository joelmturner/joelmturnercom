import { getCollection } from 'astro:content'
import { getCldImageUrl } from 'astro-cloudinary/helpers'
import type { IllustrationItem } from './types'

export async function getIllustrations(): Promise<IllustrationItem[]> {
  const illustrations = await getCollection('illustration')

  return illustrations
    .map(({ id, data }) => ({
      id,
      url: getCldImageUrl({
        src: id,
        width: data.width,
        height: data.height,
        format: 'auto',
      }),
      tags: data.tags || [],
      width: data.width,
      height: data.height,
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
}

export function imgOrSheetUrl(data: {
  imgUrls?: string[]
  sheetUrl?: string
}): {
  ogImage?: string
  sheetUrl?: string | null
  imageUrlsInSetsOfTwo: [string, string | null][] | null
} {
  const imgUrls = 'imgUrls' in data ? data.imgUrls : null
  const sheetUrl = 'sheetUrl' in data ? data.sheetUrl : null
  const imageUrlsInSetsOfTwo = imgUrls
    ? imgUrls.reduce(
        (acc, imgUrl, index) => {
          if (index % 2 === 0) {
            acc.push([imgUrl, imgUrls[index + 1] || null])
          }
          return acc
        },
        [] as [string, string | null][],
      )
    : null
  const ogImage = imgUrls?.[0] ?? sheetUrl ?? undefined
  return {
    ogImage,
    sheetUrl,
    imageUrlsInSetsOfTwo,
  }
}
