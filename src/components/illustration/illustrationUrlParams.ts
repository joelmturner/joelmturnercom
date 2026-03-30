import { ILLUSTRATION_FILTER_OPTIONS } from '@lib/constants'
import type { IllustrationTag } from '@lib/types'

export const COLLECTION_DEFAULT: IllustrationTag = 'joelmturner_featured'

export function parseCollectionParam(value: string | null): IllustrationTag {
  if (!value) return COLLECTION_DEFAULT
  if (value === 'featured') return 'joelmturner_featured'
  const option = ILLUSTRATION_FILTER_OPTIONS.find((o) => o.value === value)
  return option ? option.value : COLLECTION_DEFAULT
}
