import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdMobRewarded, PermissionStatus } from 'expo-ads-admob';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { StackParamList } from '../App';
import { TrackingContext } from '../PremiumContext';

type Props = NativeStackScreenProps<StackParamList, 'Reward'>;

export default function AdmobRewardTest(props: Props) {

    const [reward, setReward] = useState(0);

    const { trackingStatus } = useContext(TrackingContext);

    useEffect(() => {
        // リワードの初期化（テスト用ID）
        const testUnitID = Platform.select({
            // https://developers.google.com/admob/ios/test-ads
            ios: 'ca-app-pub-3940256099942544/1712485313',
            // https://developers.google.com/admob/android/test-ads
            android: 'ca-app-pub-3940256099942544/5224354917',
        });

        // 実際に広告配信する際のID
        // 広告ユニットを作成した際に表示されたものを設定する
        const adUnitID = Platform.select({
            ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
            android: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
        });

        if (testUnitID) {
            AdMobRewarded.setAdUnitID(testUnitID);
        }

        // 動画を全て見終えた場合のイベント
        AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward',
            (a) => {
                console.log(a)
                console.log('rewardedVideoUserDidEarnReward')
                // 広告を全て見終えたので報酬を与える
                setReward(reward + a.amount)
            })

        AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => console.log('rewardedVideoDidFailToPresent'))
        AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => console.log('rewardedVideoDidDismiss'))
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => console.log('rewardedVideoDidFailToLoad'))
        AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => console.log('rewardedVideoDidLoad'))
        AdMobRewarded.addEventListener('rewardedVideoDidPresent', () => console.log('rewardedVideoDidPresent'))

        // ライフサイクルが終わるときにはイベントを開放する
        return () => AdMobRewarded.removeAllListeners()
    }, [])

    const viewReward = async () => {

        // 広告の要求
        await AdMobRewarded.requestAdAsync({ servePersonalizedAds: trackingStatus === PermissionStatus.GRANTED });

        // 広告の表示
        await AdMobRewarded.showAdAsync();
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={props.navigation.goBack} />
                <Appbar.Content title='リワードテスト' />
            </Appbar.Header>
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: 'blue', margin: 32, borderRadius: 10 }}>
                    <Button title='リワード表示テスト' color='white' onPress={viewReward} />
                </View>
                <View style={{ margin: 32, borderRadius: 10 }}>
                    <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>Reward Count : {reward}</Text>
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
