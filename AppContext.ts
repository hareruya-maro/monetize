import { createContext } from "react";
export const PremiumContext = createContext({
  isPremium: false,
  setPremium: (isPremium: boolean) => {},
});
export const TrackingContext = createContext({
  nonPersonalizedOnly: true,
  setNonPersonalizedOnly: (nonPersonalizedOnly: boolean) => {},
});
