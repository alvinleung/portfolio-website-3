import React, { createContext, useState } from "react";

export interface CardBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface PageTransitionInfo {
  prevCardBounds: CardBounds | null;
  nextCardBounds: CardBounds | null;
  nextSlug: string | null;
  prevSlug: string;
  isPerformingTransition: boolean;
}

const PageTransitionContext = createContext<PageTransitionInfo>({
  prevCardBounds: null,
  nextCardBounds: null,
  nextSlug: null,
  prevSlug: "",
  isPerformingTransition: false,
});

type Props = {
  children: React.ReactNode;
};

export const PageTransitionProvider = ({ children }: Props) => {
  const [prevCardBounds, setPrevCardBounds] = useState<CardBounds | null>(null);
  const [nextCardBounds, setNextBounds] = useState<CardBounds | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [prevSlug, setPrevSlug] = useState<string>("");
  const [isPerformingTransition, setIsPerformingTransition] = useState(false);

  return (
    <PageTransitionContext.Provider
      value={{
        prevCardBounds,
        nextCardBounds,
        nextSlug,
        prevSlug,
        isPerformingTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
