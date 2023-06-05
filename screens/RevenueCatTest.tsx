import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Appbar,
  Button,
  Caption,
  Card,
  Paragraph,
  Subheading,
  Title,
} from "react-native-paper";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import { StackParamList } from "../App";
import { PremiumContext } from "../AppContext";

type Props = NativeStackScreenProps<StackParamList, "Purchase">;

export default function RevenueCatTest(props: Props) {
  // 画面表示用。通常時は¥200としている。
  const [price, setPrice] = useState("¥200");
  const [rcPackage, setRcPackage] = useState<PurchasesPackage>();

  // プレミアムユーザーかどうかを保持するContext
  const { isPremium, setPremium } = useContext(PremiumContext);

  useEffect(() => {
    try {
      // 現在提供しているプランをRevenueCatから取得する
      Purchases.getOfferings().then((offerings) => {
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          console.log(offerings.current.monthly);
          // 価格変更をアプリの変更なしで対応可能なように、offeringから価格文字列を取得する
          if (offerings.current.monthly) {
            setPrice(offerings.current.monthly?.product.priceString);
            setRcPackage(offerings.current.monthly);
          }
          // 年次（annual）の場合〜〜などと続けるか、完全に可変に対応する場合は、availablePackagesなどを利用して実装する
          // else if (offerings.current.annual){
          // 年次の場合の処理
          // }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  /** 購入処理 */
  const purchase = async () => {
    console.log("purchase");
    // Using Offerings/Packages
    try {
      // Packageが取得できているかチェックする
      if (rcPackage) {
        const { customerInfo } = await Purchases.purchasePackage(rcPackage);
        if (Object.entries(customerInfo.entitlements.active).length > 0) {
          // プレミアム購入ずみの設定をアプリ全体に反映させる
          setPremium(true);
        }
      } else {
        // OfferingとPackageを使わず、product_idを直接指定して購入することも可能
        // 金額変更などを考えていなければ初めはこの実装でも可
        await Purchases.purchaseProduct("product_id");
      }
    } catch (e) {
      if (
        typeof e === "object" &&
        e !== null &&
        "userCancelled" in e &&
        !e.userCancelled
      ) {
        console.log(e);
        Alert.alert("購入できませんでした");
      }
    }
  };

  /** 購入の復元処理 */
  const restore = async () => {
    console.log("restore");
    try {
      const restore = await Purchases.restorePurchases();
      if (Object.entries(restore.entitlements.active).length > 0) {
        // プレミアム購入ずみの設定をアプリ全体に反映させる
        setPremium(true);
        console.log("setPremium");
        Alert.alert("復元しました");
      } else {
        Alert.alert("復元対象がありません");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("復元対象がありません");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content title="課金テスト" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <Title style={{ textAlign: "center" }}>
          サブスクリプションメニュー
        </Title>
        <Card style={styles.cardBody}>
          <Card.Title title="プレミアムプラン" />
          <Card.Content>
            <Subheading>
              プレミアムプラン:{price} <Caption>※価格を可変にする</Caption>
            </Subheading>
            <Paragraph>広告非表示</Paragraph>
            <Paragraph>制限の解除</Paragraph>
            <Paragraph>などなど・・・</Paragraph>
          </Card.Content>
        </Card>
        <View style={{ margin: 16 }}>
          <Button mode="contained" onPress={purchase} disabled={isPremium}>
            {isPremium ? "購入済み" : "購入する"}
          </Button>
        </View>
        <View style={{ margin: 16 }}>
          <Button mode="outlined" onPress={restore} disabled={isPremium}>
            {isPremium ? "購入済み" : "復元する"}
          </Button>
        </View>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 16,
  },
  cardBody: {
    flex: 1,
    margin: 24,
  },
});
