import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { ILLUSTRATION_QUERY_VS_FILTER } from '../lib/constants';
import { IllustrationTag } from '../lib/types';

type LightBoxContextType = {
  collection: string;
  index: number;
};

type LightBoxType = {
  lightbox: LightBoxContextType;
  setLightbox: (
    value: LightBoxContextType | ((val: LightBoxContextType) => LightBoxContextType)
  ) => void;
};

const LightboxContext = createContext<LightBoxType | null>(null);

export function LightboxContextProvider({ children }: PropsWithChildren<Record<string, unknown>>) {
  const router = useRouter();
  const collection =
    ILLUSTRATION_QUERY_VS_FILTER[
      ((router.query.collection as IllustrationTag) ?? 'featured').toLowerCase()
    ];
  const imageIndex = parseInt(router.query.imageIndex as string) as number;

  const [lightbox, setLightboxContextState] = useState<LightBoxContextType>({
    collection,
    index: Number.isNaN(imageIndex) ? -1 : imageIndex,
  });

  useEffect(() => {
    setLightboxContextState({
      collection,
      index: imageIndex,
    });
  }, [collection, imageIndex]);

  const setLightbox = useCallback(
    (value: LightBoxContextType | ((val: LightBoxContextType) => LightBoxContextType)) => {
      setLightboxContextState((prevState) => {
        const newState = value instanceof Function ? value(prevState) : value;
        const imageIndex = newState.index > -1 ? newState.index : undefined;
        const newQuery = {
          collection: newState.collection,
        };

        if (imageIndex) {
          newQuery['imageIndex'] = imageIndex;
        }

        router.replace(
          {
            query: { ...router.query, ...newQuery },
          },
          undefined,
          { scroll: false }
        );

        return { ...prevState, ...newState };
      });
    },
    [router]
  );

  return (
    <LightboxContext.Provider value={{ lightbox, setLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
}

export const useLightBoxContext = (): LightBoxType => useContext(LightboxContext);
