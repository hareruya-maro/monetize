import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import { Appbar, Button, Title } from "react-native-paper";
import { StackParamList } from "../App";
import { TrackingContext } from "../PremiumContext";

type Props = NativeStackScreenProps<StackParamList, "Interstitial">;

export default function AdmobInterstitialTest(props: Props) {
  const { nonPersonalizedOnly } = useContext(TrackingContext);
  const [unitId, setUnitId] = useState<string>(TestIds.INTERSTITIAL);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(unitId, {
    requestNonPersonalizedAdsOnly: !!nonPersonalizedOnly,
  });

  useEffect(() => {
    // インタースティシャルの初期化（テスト用ID）
    const testUnitID = TestIds.INTERSTITIAL;

    // 実際に広告配信する際のID
    // 広告ユニットを作成した際に表示されたものを設定する
    const adUnitID = Platform.select({
      ios: "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy",
      android: "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy",
    });

    if (testUnitID) {
      setUnitId(testUnitID);
    } else if (adUnitID) {
      setUnitId(adUnitID);
    }
  }, []);

  useEffect(() => {
    if (load) {
      // 広告をロードする
      load();
    }
  }, [load]);

  useEffect(() => {
    // 閉じられたら次の広告をロードする
    if (isClosed) {
      load();
    }
  }, [isClosed]);

  const viewInterstitial = useCallback(async () => {
    // 広告の表示
    if (isLoaded) {
      show();
    } else {
      console.log("not loaded:", isLoaded);
    }
  }, [isLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content title="インタースティシャルテスト" />
      </Appbar.Header>
      <View style={styles.container}>
        <Title style={{ textAlign: "center" }}>
          Load status : {isLoaded ? "loaded" : "not loaded"}
        </Title>
        <Button
          mode="contained"
          color="blue"
          style={{ margin: 32, borderRadius: 10 }}
          onPress={viewInterstitial}
        >
          インタースティシャル表示テスト
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
