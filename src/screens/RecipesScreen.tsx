import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { searchByIngredients } from '../data/search';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import { t } from '../i18n/i18n';


type Props = NativeStackScreenProps<RootStackParamList, 'Recipes'>;


export default function RecipesScreen({ route, navigation }: Props) {
    const selected = route.params?.selected ?? [];
    const results = useMemo(() => searchByIngredients(selected, 5), [selected]);


    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a' }}>
            <View style={{ padding:16 }}>
                <Text style={{ color:'#e2e8f0', fontSize:22, fontWeight:'800' }}>{t('recipes_title')}</Text>
                {results.length === 0 ? (
                    <Text style={{ color:'#94a3b8', marginTop:8 }}>{t('recipes_empty')}</Text>
                    ) : (
                    <View style={{ marginTop:12, gap:12 }}>
                        {results.map(r => (
                        <Pressable
                            key={r.id}
                            onPress={() => navigation.navigate('Detail', { recipe: r })}
                            style={{ backgroundColor:'#0b1222', borderColor:'#1f2a44', borderWidth:1, padding:16, borderRadius:14 }}
                            >
                            <Text style={{ color:'#e2e8f0', fontSize:18, fontWeight:'700' }}>{r.title}</Text>
                        </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}