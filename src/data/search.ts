import MiniSearch from 'minisearch';
import RNFS from 'react-native-fs';
import type { Recipe } from '../types';
import { normalizeIngredientName } from './ingredientCatalog';

let mini: MiniSearch | null = null;

export async function buildIndex(jsonlPath: string, maxRows = 12000) {
  const text = await RNFS.read(jsonlPath);
  const docs: any[] = [];
  let count = 0;

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try {
      const r: Recipe = JSON.parse(line);
      const keys = (r.ingredients || [])
        .map(i => normalizeIngredientName(i.name))
        .filter(Boolean) as string[];
      docs.push({ ...r, ingredientsText: keys.join(' ') });
      if (++count >= maxRows) break;
    } catch {}
  }

  mini = new MiniSearch({
    fields: ['title', 'ingredientsText'],
    storeFields: ['id','title','ingredients','steps','servings','image'],
    searchOptions: { prefix: true, fuzzy: 0.2 },
  });
  mini.addAll(docs);
}
export function searchByIngredients(selectedKeys: string[], topN = 5): Recipe[] {
  if (!mini || selectedKeys.length === 0) return [];
  const raw: any[] = mini.search(selectedKeys.join(' '), { combineWith: 'AND' });
  return raw.slice(0, topN).map(h => h as Recipe);
}
export function scaleQty(q?: number, base?: number, tgt = 1, unit?: string) {
  if (!q || !base || base <= 0) return q;
  const raw = q * (tgt / base);
  if (unit && ['adet','diş','yaprak'].includes(unit)) return Math.round(raw * 2) / 2;
  if (unit && ['g','ml'].includes(unit)) return Math.round(raw / 5) * 5;
  return Math.round(raw * 100) / 100;
}
export function scaleIngredients(ings: any[], base?: number, tgt = 1) {
  return (ings || []).map(i => ({ ...i, qty: scaleQty(i.qty, base, tgt, i.unit) }));
}
