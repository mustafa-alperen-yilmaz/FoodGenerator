import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { scaleIngredients } from '../data/search';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import type { Recipe } from '../types';
import { t } from '../i18n/i18n';


type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;


export default function DetailScreen({ route }: Props) {
    const recipe = route.params.recipe as Recipe;
    const [serv, setServ] = useState<number>(recipe.servings ?? 1);
    const scaled = useMemo(() => scaleIngredients(recipe.ingredients || [], recipe.servings ?? 1, serv), [recipe, serv]);


    return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a' }}>
        <ScrollView contentContainerStyle={{ padding:16 }}>
            {!!recipe.image && (
            <Image source={{ uri: recipe.image }} resizeMode="cover" style={{ width:'100%', height:200, borderRadius:16, backgroundColor:'#0b1222' }} />
            )}


            <Text style={{ color:'#e2e8f0', fontSize:22, fontWeight:'800', marginTop:12 }}>{recipe.title}</Text>


            <View style={{ marginTop:12 }}>
                <Text style={{ color:'#cbd5e1', marginBottom:6, fontWeight:'700' }}>{t('detail_servings_q')}</Text>
                <View style={{ backgroundColor:'#0b1222', borderColor:'#1f2a44', borderWidth:1, borderRadius:12 }}>
                    <Picker selectedValue={serv} onValueChange={(v) => setServ(v)} dropdownIconColor={'#e2e8f0'} style={{ color:'#e2e8f0' }}>
                        <Picker.Item label="1" value={1} />
                        <Picker.Item label="2" value={2} />
                        <Picker.Item label="4" value={4} />
                        <Picker.Item label="6" value={6} />
                    </Picker>
                </View>
            </View>


            <Text style={{ color:'#cbd5e1', marginTop:16, fontWeight:'700' }}>{t('detail_ingredients')}</Text>
            <View style={{ marginTop:8, gap:6 }}>
                {scaled.map((i, idx) => (
                <Text key={idx} style={{ color:'#e2e8f0' }}>• {i.qty ?? ''} {i.unit ?? ''} {i.name}</Text>
                ))}
            </View>


            <Text style={{ color:'#cbd5e1', marginTop:16, fontWeight:'700' }}>{t('detail_steps')}</Text>
            <View style={{ marginTop:8, gap:6 }}>
                {(recipe.steps || []).map((s, idx) => (
                <Text key={idx} style={{ color:'#e2e8f0' }}>{idx + 1}. {s}</Text>
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}