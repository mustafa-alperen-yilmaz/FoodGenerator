import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import INGREDIENTS from '../data/ingredientList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import { t } from '../i18n/i18n';


type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;


export default function SearchScreen({ navigation }: Props) {
    const [q, setQ] = useState('');
    const [sel, setSel] = useState<Set<string>>(new Set());


    const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return INGREDIENTS;
    return INGREDIENTS.filter(x => x.toLowerCase().includes(s));
    }, [q]);


    const toggle = (name: string) => {
        const s = new Set(sel);
        s.has(name) ? s.delete(name) : s.add(name);
        setSel(s);
    };

    return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0f172a' }}>
        <View style={{ padding:16, gap:12 }}>
            <Text style={{ color:'#e2e8f0', fontSize:22, fontWeight:'800' }}>{t('search_title')}</Text>
            <TextInput
                value={q}
                onChangeText={setQ}
                placeholder={t('search_placeholder')}
                placeholderTextColor="#64748b"
                style={{ backgroundColor:'#0b1222', borderColor:'#1f2a44', borderWidth:1, color:'#e2e8f0', padding:12, borderRadius:12 }}
            />
            <FlatList
                data={list}
                keyExtractor={(i) => i}
                numColumns={2}
                columnWrapperStyle={{ gap:12 }}
                contentContainerStyle={{ gap:12 }}
                renderItem={({ item }) => {
                    const checked = sel.has(item);
                    return (
                        <Pressable
                            onPress={() => toggle(item)}
                            style={{
                            flex:1, padding:12, borderRadius:12,
                            borderWidth:1, borderColor: checked ? '#16a34a' : '#334155',
                            backgroundColor: checked ? '#052e16' : '#0b1222',
                            }}
                            >
                            <Text style={{ color:'#e2e8f0' }}>{item}</Text>
                        </Pressable>
                    );
                }}
            />
            <Pressable
                    onPress={() => navigation.navigate('Recipes', { selected: Array.from(sel) })}
                    style={{ backgroundColor:'#22c55e', padding:14, borderRadius:14, alignItems:'center' }}
                >
                <Text style={{ color:'white', fontWeight:'800' }}>{t('btn_show_recipes')}</Text>
            </Pressable>
        </View>
    </SafeAreaView>
    );
}