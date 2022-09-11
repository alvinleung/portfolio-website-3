import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

export interface CardBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface PageTransitionInfo {
  // prevCardContainer: CardBounds | null;
  // nextCardBounds: CardBounds | null;
  prevCardRef: MutableRefObject<HTMLDivElement | HTMLAnchorElement | undefined>;
  nextSlug: string | null;
  prevSlug: string;
  isPerformingTransition: boolean;
}

const PageTransitionContext = createContext<PageTransitionInfo>({
  prevCardRef: { current: undefined },
  // nextCardBounds: null,
  nextSlug: null,
  prevSlug: "",
  isPerformingTransition: false,
});

type Props = {
  children: React.ReactNode;
};

export const PageTransitionProvider = ({ children }: Props) => {
  // const [prevCardBounds, setPrevCardBounds] = useState<CardBounds | null>(null);
  // const [nextCardBounds, setNextBounds] = useState<CardBounds | null>(null);
  const prevCardRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [prevSlug, setPrevSlug] = useState<string>("");
  const [isPerformingTransition, setIsPerformingTransition] = useState(false);

  return (
    <PageTransitionContext.Provider
      value={{
        // prevCardBounds,
        // nextCardBounds,
        prevCardRef,
        nextSlug,
        prevSlug,
        isPerformingTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => useContext(PageTransitionContext);
