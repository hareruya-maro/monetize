import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdMobInterstitial } from 'expo-ads-admob';
import React, { useCallback, useEffect } from 'react';
import { Button, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { StackParamList } from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Interstitial'>;

export default function AdmobInterstitialTest(props: Props) {

    useEffect(() => {
        // インタースティシャルの初期化（テスト用ID）
        const testUnitID = Platform.select({
            // https://developers.google.com/admob/ios/test-ads
            ios: 'ca-app-pub-3940256099942544/4411468910',
            // https://developers.google.com/admob/android/test-ads
            android: 'ca-app-pub-3940256099942544/1033173712',
        });

        // 実際に広告配信する際のID
        // 広告ユニットを作成した際に表示されたものを設定する
        const adUnitID = Platform.select({
            ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
            android: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
        });

        if (testUnitID) {
            AdMobInterstitial.setAdUnitID(testUnitID);
        }
    }, [])

    const viewInterstitial = useCallback(async () => {

        // 広告の要求
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });

        // 広告の表示
        await AdMobInterstitial.showAdAsync();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={props.navigation.goBack} />
                <Appbar.Content title='インタースティシャルテスト' />
            </Appbar.Header>
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: 'blue', margin: 32, borderRadius: 10 }}>
                    <Button title='インタースティシャル表示テスト' color='white' onPress={viewInterstitial} />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
