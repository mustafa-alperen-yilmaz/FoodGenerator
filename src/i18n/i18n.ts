import * as RNLocalize from 'react-native-localize';
export type Lang = 'en' | 'tr';
const supported: Lang[] = ['en', 'tr'];


function detectLanguage(): Lang {
    const locales = RNLocalize.getLocales();
    const code = locales?.[0]?.languageCode?.toLowerCase();
    return supported.includes(code as Lang) ? (code as Lang) : 'en';
}


let currentLang: Lang = detectLanguage();


export function getLanguage(): Lang { return currentLang; }
export function setLanguage(lang: Lang) { currentLang = lang; }


const dict: Record<Lang, Record<string, string>> = {
    en: {
        app_title: 'Food Generator',
        splash_sub: 'Find meals from your ingredients',
        splash_progress: 'Setting up… %{p}%',
        data_notice: 'Data: Open Recipes (CC BY 3.0) — App code: MIT',


        search_title: 'Pick Ingredients',
        search_placeholder: 'Search: tomato, egg…',
        btn_show_recipes: 'Show Recipes',


        recipes_title: 'Matching Recipes',
        recipes_empty: 'No recipes found for your selection.',


        detail_servings_q: 'How many servings?',
        detail_ingredients: 'Ingredients',
        detail_steps: 'Directions',
        close: 'Close',
    },
    tr: {
        app_title: 'Food Generator',
        splash_sub: 'Elindeki malzemelerle yemek bul',
        splash_progress: 'İlk kurulum… %{p}%',
        data_notice: 'Veri: Open Recipes (CC BY 3.0) — Uygulama kodu: MIT',


        search_title: 'Malzemeleri Seç',
        search_placeholder: 'Ara: domates, yumurta…',
        btn_show_recipes: 'Tarifleri Göster',


        recipes_title: 'Uygun Tarifler',
        recipes_empty: 'Seçime uygun tarif bulunamadı.',


        detail_servings_q: 'Kaç kişilik?',
        detail_ingredients: 'Malzemeler',
        detail_steps: 'Yapılışı',
        close: 'Kapat',
    },
};


export function t(key: string, vars?: Record<string, string | number>): string {
    const table = dict[currentLang] ?? dict.en;
    let s = table[key] ?? dict.en[key] ?? key;
    if (vars) for (const k of Object.keys(vars)) s = s.replace(new RegExp(`%\\{${k}\\}`, 'g'), String(vars[k]));
        return s;
}