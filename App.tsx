import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Title } from 'react-native-paper';
import Purchases from 'react-native-purchases';
import { PremiumContext } from './PremiumContext';
import AdmobBannerTest from './screens/AdmobBannerTest';
import AdmobInterstatialTest from './screens/AdmobInterstatialTest';
import AdmobRewardTest from './screens/AdmobRewardTest';
import RevenueCatTest from './screens/RevenueCatTest';

export type StackParamList = {
  Home: undefined;
  Banner: undefined;
  Interstatial: undefined;
  Reward: undefined;
  Purchase: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type Props = NativeStackScreenProps<StackParamList, 'Banner'>;

function HomeScreen(props: Props) {

  const { isPremium } = useContext(PremiumContext);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title='Admob ＆ RevenueCatテストアプリ' />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Title style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>
            Welcome {isPremium ? 'Premium' : 'Normal'} User!!</Title>
          <View style={{ margin: 16, padding: 16, borderWidth: 1, }}>
            <Title>Admob</Title>
            <View style={{ backgroundColor: '#d85140', margin: 32, borderRadius: 10 }}>
              <Button title='バナーテスト' color='white' onPress={() => props.navigation.navigate('Banner')} />
            </View>
            <View style={{ backgroundColor: '#f1be42', margin: 32, borderRadius: 10 }}>
              <Button title='インターステイシャルテスト' color='black' onPress={() => props.navigation.navigate('Interstatial')} />
            </View>
            <View style={{ backgroundColor: '#5384ec', margin: 32, borderRadius: 10 }}>
              <Button title='リワードテスト' color='white' onPress={() => props.navigation.navigate('Reward')} />
            </View>
          </View>
          <View style={{ margin: 16, padding: 16, borderWidth: 1, }}>
            <Title>RevenueCat</Title>
            <View style={{ backgroundColor: '#e05f60', margin: 32, borderRadius: 10 }}>
              <Button title='課金テスト' color='white' onPress={() => props.navigation.navigate('Purchase')} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}


export default function App() {

  const [isPremium, setPremium] = useState(false);

  useEffect(() => {
    // SDKの初期化処理
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      await Purchases.setup("public_ios_sdk_key");
    } else if (Platform.OS === 'android') {
      await Purchases.setup("public_google_sdk_key");
    }

    // すでに購入ずみのか起動時に取得して反映する
    Purchases.getPurchaserInfo()
      .then(purchaserInfo => {
        if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
          // プレミアム購入ずみの設定をアプリ全体に反映させる
          setPremium(true);
          console.log('setPremium true')
        } else {
          setPremium(false);
          console.log('setPremium false')
        }
      })
      .catch(e => console.log(e));

  }, [])

  return (
    <NavigationContainer>
      <PremiumContext.Provider value={{ isPremium, setPremium }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Banner" component={AdmobBannerTest} />
          <Stack.Screen name="Interstatial" component={AdmobInterstatialTest} />
          <Stack.Screen name="Reward" component={AdmobRewardTest} />
          <Stack.Screen name="Purchase" component={RevenueCatTest} />
        </Stack.Navigator>
      </PremiumContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
