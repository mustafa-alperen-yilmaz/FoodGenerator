import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, View } from 'react-native';
import { ensureDataset } from '../data/dataset';
import { buildIndex } from '../data/search';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import { t } from '../i18n/i18n';


type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


export default function SplashScreen({ navigation }: Props) {
    const [p, setP] = useState(0);
    useEffect(() => {
        (async () => {
        const path = await ensureDataset(setP);
        await buildIndex(path, 12000);
        navigation.replace('Search');
        })();
    }, [navigation]);


return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a' }}>
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
            <Text style={{ color:'#e2e8f0', fontSize:28, fontWeight:'800' }}>{t('app_title')}</Text>
            <Text style={{ color:'#94a3b8', marginTop:6 }}>{t('splash_sub')}</Text>
            <Text style={{ color:'#94a3b8', marginTop:6 }}>{t('splash_progress', { p: Math.round(p*100) })}</Text>
            <ActivityIndicator style={{ marginTop:12 }} />
            <Text style={{ color:'#64748b', marginTop:20, fontSize:12 }}>{t('data_notice')}</Text>
        </View>
    </SafeAreaView>
);
}