import { createContext } from "react";

export const PremiumContext = createContext({ isPremium: false, setPremium: (isPremium: boolean) => { } })
