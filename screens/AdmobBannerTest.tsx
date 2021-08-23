import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import MyAdmob from '../android/components/MyAdmob';
import { StackParamList } from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Banner'>;

export default function AdmobBannerTest(props: Props) {

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={props.navigation.goBack} />
                <Appbar.Content title='バナーテスト' />
            </Appbar.Header>
            <ScrollView style={styles.container}>
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='banner'</Text>
                <MyAdmob bannerSize='banner' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='fullBanner'</Text>
                <MyAdmob bannerSize='fullBanner' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='largeBanner'</Text>
                <MyAdmob bannerSize='largeBanner' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='leaderboard'</Text>
                <MyAdmob bannerSize='leaderboard' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='mediumRectangle'</Text>
                <MyAdmob bannerSize='mediumRectangle' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='smartBannerLandscape'</Text>
                <MyAdmob bannerSize='smartBannerLandscape' />
                <Text style={{ fontSize: 24, textAlign: 'center', margin: 10 }}>bannerSize='smartBannerPortrait'</Text>
                <MyAdmob bannerSize='smartBannerPortrait' />
            </ScrollView>
            <SafeAreaView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
