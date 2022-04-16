import { PermissionStatus } from "expo-ads-admob";
import { createContext } from "react";

export const PremiumContext = createContext({ isPremium: false, setPremium: (isPremium: boolean) => { } })
export const TrackingContext = createContext({ trackingStatus: PermissionStatus.UNDETERMINED, setTrackingStatus: (trackingStatus: PermissionStatus) => { } })
