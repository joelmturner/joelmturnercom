'use client';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { ILLUSTRATION_QUERY_VS_FILTER } from '../lib/constants';
import { parseAsInteger, useQueryState } from 'next-usequerystate';

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
  const [collectionParam, setCollection] = useQueryState('collection');
  const [index, setIndex] = useQueryState('index', parseAsInteger);
  const [direction, setDirection] = useQueryState('direction', parseAsInteger);
  const collection = ILLUSTRATION_QUERY_VS_FILTER[(collectionParam ?? 'featured').toLowerCase()];

  const lightbox = useMemo(() => {
    return {
      collection,
      index,
      direction,
    } as LightBoxContextType;
  }, [collection, direction, index]);

  const setLightbox = useCallback(
    (value: LightBoxContextType | ((val: LightBoxContextType) => LightBoxContextType)) => {
      const newState = value instanceof Function ? value(lightbox) : value;
      const imageIndex = newState.index > -1 ? newState.index : null;
      const dir = newState.direction || null;

      setCollection(newState.collection);
      setIndex(imageIndex);
      setDirection(dir);
    },
    [lightbox, setCollection, setDirection, setIndex]
  );

  return (
    <LightboxContext.Provider value={{ lightbox, setLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
}

export const useLightBoxContext = (): LightBoxType => useContext(LightboxContext);
