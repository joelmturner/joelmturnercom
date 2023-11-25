'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { ILLUSTRATION_QUERY_VS_FILTER } from '../lib/constants';
import { IllustrationTag } from '../lib/types';

type LightBoxContextType = {
  collection: string;
  index: number;
  direction: -1 | 0 | 1;
};

type LightBoxType = {
  lightbox: LightBoxContextType;
  setLightbox: (
    value: LightBoxContextType | ((val: LightBoxContextType) => LightBoxContextType)
  ) => void;
};

function setLightBoxDefaultValue() {
  return null;
}

const LightboxContext = createContext<LightBoxType>({
  lightbox: {
    collection: 'joelmturner_featured',
    index: -1,
    direction: 0,
  },
  setLightbox: setLightBoxDefaultValue,
});

export function LightboxContextProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collection =
    ILLUSTRATION_QUERY_VS_FILTER[
      ((searchParams?.get('collection') as IllustrationTag) ?? 'featured').toLowerCase()
    ];
  const imageIndex = searchParams?.get('imageIndex')
    ? (parseInt(searchParams?.get('imageIndex') as string) as number)
    : -1;
  const direction = searchParams?.get('direction')
    ? (parseInt(searchParams?.get('direction') as string) as -1 | 0 | 1)
    : 0;

  const lightbox = useMemo(() => {
    return {
      collection,
      index: imageIndex,
      direction,
    };
  }, [collection, direction, imageIndex]);

  const setLightbox = useCallback(
    (value: LightBoxContextType | ((val: LightBoxContextType) => LightBoxContextType)) => {
      const newState = value instanceof Function ? value(lightbox) : value;
      const imageIndex = newState.index > -1 ? newState.index : undefined;
      const dir = newState.direction ?? 0;
      const newQuery = {
        collection: newState.collection,
      };

      if (imageIndex) {
        newQuery['imageIndex'] = imageIndex;
      }

      const indexParam = imageIndex && !Number.isNaN(imageIndex) ? `&imageIndex=${imageIndex}` : '';
      router.push(`/illustration?collection=${newQuery.collection}${indexParam}&direction=${dir}`, {
        scroll: false,
      });
    },
    [lightbox, router]
  );

  return (
    <LightboxContext.Provider value={{ lightbox, setLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
}

export const useLightBoxContext = (): LightBoxType => useContext(LightboxContext);
