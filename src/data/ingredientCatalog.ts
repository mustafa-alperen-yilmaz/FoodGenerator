export type IngredientDef = {
  key: string;
  labels: { en: string; tr: string };
  aliases: string[];
};

export const INGREDIENT_CATALOG: IngredientDef[] = [
  { key: 'egg', labels: { en: 'Egg', tr: 'Yumurta' }, aliases: ['egg','eggs','yumurta'] },
  { key: 'tomato', labels: { en: 'Tomato', tr: 'Domates' }, aliases: ['tomato','tomatoes','domates'] },
  { key: 'onion', labels: { en: 'Onion', tr: 'Soğan' }, aliases: ['onion','onions','soğan','sogan'] },
  { key: 'garlic', labels: { en: 'Garlic', tr: 'Sarımsak' }, aliases: ['garlic','sarımsak','sarimsak'] },
  { key: 'pepper', labels: { en: 'Pepper', tr: 'Biber' }, aliases: ['pepper','biber','bell pepper','chili'] },
  { key: 'cucumber', labels: { en: 'Cucumber', tr: 'Salatalık' }, aliases: ['cucumber','salatalık','salatalik'] },
  { key: 'potato', labels: { en: 'Potato', tr: 'Patates' }, aliases: ['potato','potatoes','patates'] },
  { key: 'rice', labels: { en: 'Rice', tr: 'Pirinç' }, aliases: ['rice','pirinç','pirinc'] },
  { key: 'pasta', labels: { en: 'Pasta', tr: 'Makarna' }, aliases: ['pasta','makarna','spaghetti'] },
  { key: 'flour', labels: { en: 'Flour', tr: 'Un' }, aliases: ['flour','un'] },
  { key: 'olive_oil', labels: { en: 'Olive Oil', tr: 'Zeytinyağı' }, aliases: ['olive oil','zeytinyağı','zeytinyagi'] },
  { key: 'butter', labels: { en: 'Butter', tr: 'Tereyağı' }, aliases: ['butter','tereyağı','tereyagi'] },
  { key: 'yogurt', labels: { en: 'Yogurt', tr: 'Yoğurt' }, aliases: ['yogurt','yoğurt','yogurt'] },
  { key: 'cheese', labels: { en: 'Cheese', tr: 'Peynir' }, aliases: ['cheese','peynir'] },
  { key: 'lentil', labels: { en: 'Lentil', tr: 'Mercimek' }, aliases: ['lentil','lentils','mercimek'] },
  { key: 'chickpea', labels: { en: 'Chickpea', tr: 'Nohut' }, aliases: ['chickpea','chickpeas','nohut'] },
  { key: 'salt', labels: { en: 'Salt', tr: 'Tuz' }, aliases: ['salt','tuz'] },
  { key: 'black_pepper', labels: { en: 'Black Pepper', tr: 'Karabiber' }, aliases: ['black pepper','karabiber'] },
  { key: 'red_pepper', labels: { en: 'Red Pepper', tr: 'Kırmızı Biber' }, aliases: ['red pepper','kırmızı biber','kirmizi biber','paprika','chili'] },
];

export const aliasToKey: Record<string, string> = (() => {
  const m: Record<string, string> = {};
  for (const d of INGREDIENT_CATALOG) {
    for (const a of d.aliases) m[a.toLowerCase()] = d.key;
  }
  return m;
})();

export function localizedList(lang: 'en' | 'tr'): string[] {
  return INGREDIENT_CATALOG.map(d => d.labels[lang]);
}

export function labelFor(key: string, lang: 'en' | 'tr') {
  return INGREDIENT_CATALOG.find(d => d.key === key)?.labels[lang] ?? key;
}

export function pickKeyFromLabel(label: string): string | null {
  const l = label.toLowerCase();
  const hit = INGREDIENT_CATALOG.find(d =>
    d.labels.en.toLowerCase() === l || d.labels.tr.toLowerCase() === l
  );
  return hit?.key ?? null;
}

export function normalizeIngredientName(raw?: string): string | null {
  if (!raw) return null;
  const k = aliasToKey[raw.toLowerCase()];
  return k ?? null;
}
