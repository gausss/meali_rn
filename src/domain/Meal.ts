export interface Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
  complexity?: Complexity;
}

export type Complexity = 'EASY' | 'HARD';

export interface Ingredient {
  name: string;
  count: number;
  type: Unit;
}

export type Unit = 'GRM' | 'ML' | 'UNIT';
