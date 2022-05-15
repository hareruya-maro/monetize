import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import mobileAds, {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
  MaxAdContentRating,
} from "react-native-google-mobile-ads";
import { Appbar, Button, Title } from "react-native-paper";
import Purchases from "react-native-purchases";
import { PremiumContext, TrackingContext } from "./PremiumContext";
import AdmobBannerTest from "./screens/AdmobBannerTest";
import AdmobInterstitialTest from "./screens/AdmobInterstitialTest";
import AdmobRewardTest from "./screens/AdmobRewardTest";
import RevenueCatTest from "./screens/RevenueCatTest";

export type StackParamList = {
  Home: undefined;
  Banner: undefined;
  Interstitial: undefined;
  Reward: undefined;
  Purchase: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type Props = NativeStackScreenProps<StackParamList, "Banner">;

function HomeScreen(props: Props) {
  const { isPremium } = useContext(PremiumContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Admob ＆ RevenueCatテストアプリ" />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Title style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
            Welcome {isPremium ? "Premium" : "Normal"} User!!
          </Title>
          <View style={{ margin: 16, padding: 16, borderWidth: 1 }}>
            <Title>Admob</Title>
            <Button
              mode="contained"
              color="#d85140"
              style={{
                margin: 32,
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("Banner")}
            >
              バナーテスト
            </Button>
            <Button
              mode="contained"
              color="#f1be42"
              style={{
                margin: 32,
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("Interstitial")}
            >
              インターステイシャルテスト
            </Button>
            <Button
              mode="contained"
              color="#5384ec"
              style={{
                margin: 32,
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("Reward")}
            >
              リワードテスト
            </Button>
          </View>
          <View style={{ margin: 16, padding: 16, borderWidth: 1 }}>
            <Title>RevenueCat</Title>
            <Button
              mode="contained"
              color="#e05f60"
              style={{
                margin: 32,
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("Purchase")}
            >
              課金テスト
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  const [isPremium, setPremium] = useState(false);
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true);

  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.G,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: false,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: false,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ["EMULATOR"],
      })
      .then(() => {
        // Request config successfully set!
        mobileAds()
          .initialize()
          .then((adapterStatuses) => {
            // Initialization complete!
          });
      });

    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA,
      testDeviceIdentifiers: ["TEST-DEVICE-HASHED-ID"],
    }).then(async (consentInfo) => {
      let status = consentInfo.status;
      if (
        consentInfo.isConsentFormAvailable &&
        status === AdsConsentStatus.REQUIRED
      ) {
        const result = await AdsConsent.showForm();
        status = result.status;
      }

      if (
        consentInfo.status === AdsConsentStatus.OBTAINED ||
        status === AdsConsentStatus.OBTAINED
      ) {
        setNonPersonalizedOnly(false);
      }
    });

    // SDKの初期化処理
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === "ios") {
      Purchases.setup("public_ios_sdk_key");
    } else if (Platform.OS === "android") {
      Purchases.setup("public_google_sdk_key");
    }

    // すでに購入ずみのか起動時に取得して反映する
    Purchases.getPurchaserInfo()
      .then((purchaserInfo) => {
        if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
          // プレミアム購入ずみの設定をアプリ全体に反映させる
          setPremium(true);
          console.log("setPremium true");
        } else {
          setPremium(false);
          console.log("setPremium false");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <NavigationContainer>
      <TrackingContext.Provider
        value={{ nonPersonalizedOnly, setNonPersonalizedOnly }}
      >
        <PremiumContext.Provider value={{ isPremium, setPremium }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Banner" component={AdmobBannerTest} />
            <Stack.Screen
              name="Interstitial"
              component={AdmobInterstitialTest}
            />
            <Stack.Screen name="Reward" component={AdmobRewardTest} />
            <Stack.Screen name="Purchase" component={RevenueCatTest} />
          </Stack.Navigator>
        </PremiumContext.Provider>
      </TrackingContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
