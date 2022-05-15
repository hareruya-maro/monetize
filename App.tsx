import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  getPermissionsAsync,
  PermissionStatus,
  requestPermissionsAsync,
} from "expo-ads-admob";
import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
  const [trackingStatus, setTrackingStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED
  );

  useEffect(() => {
    // App Transparency対応
    getPermissionsAsync().then((res) => {
      // 許可されていない（res.granted === trueでない）かつ、
      // res.statusがUNDETERMINED（未定）またはcanAskAgain（再確認が可能）の場合、
      // 確認ダイアログを表示する
      if (
        (!res.granted && res.status === PermissionStatus.UNDETERMINED) ||
        res.canAskAgain
      ) {
        requestPermissionsAsync().then((res) => {
          // 確認ダイアログの結果を設定する
          setTrackingStatus(res.status);
        });
      } else {
        // 確認ダイアログが表示できない場合は今のステータスをそのまま設定する
        setTrackingStatus(res.status);
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
      <TrackingContext.Provider value={{ trackingStatus, setTrackingStatus }}>
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
