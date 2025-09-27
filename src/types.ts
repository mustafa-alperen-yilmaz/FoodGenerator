export type Ingredient = { name: string; qty?: number; unit?: string };
export type Recipe = {
  id: string;
  title: string;
  image?: string;
  servings?: number;   
  ingredients: Ingredient[];
  steps: string[];
};