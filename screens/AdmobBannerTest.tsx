import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { BannerAdSize } from "react-native-google-mobile-ads";
import { Appbar, Surface, Title } from "react-native-paper";
import MyAdmob from "../android/components/MyAdmob";
import { StackParamList } from "../App";

type Props = NativeStackScreenProps<StackParamList, "Banner">;

export default function AdmobBannerTest(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content title="バナーテスト" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.BANNER}
          </Title>
          <MyAdmob size={BannerAdSize.BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.FULL_BANNER}
          </Title>
          <MyAdmob size={BannerAdSize.FULL_BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.LARGE_BANNER}
          </Title>
          <MyAdmob size={BannerAdSize.LARGE_BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.LEADERBOARD}
          </Title>
          <MyAdmob size={BannerAdSize.LEADERBOARD} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.MEDIUM_RECTANGLE}
          </Title>
          <MyAdmob size={BannerAdSize.MEDIUM_RECTANGLE} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.ADAPTIVE_BANNER}（非推奨）
          </Title>
          <MyAdmob size={BannerAdSize.ADAPTIVE_BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          </Title>
          <MyAdmob size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.FLUID}
          </Title>
          <MyAdmob size={BannerAdSize.FLUID} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
          </Title>
          <MyAdmob size={BannerAdSize.INLINE_ADAPTIVE_BANNER} />
        </Surface>
        <Surface style={{ marginVertical: 8, paddingVertical: 8 }}>
          <Title style={{ textAlign: "center", margin: 10 }}>
            size={BannerAdSize.WIDE_SKYSCRAPER}
          </Title>
          <MyAdmob size={BannerAdSize.WIDE_SKYSCRAPER} />
        </Surface>
      </ScrollView>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
