import { Meal } from './Meal';

export interface Suggestion {
  readonly index: number;
  readonly meal: Meal;
  readonly pinned: boolean;
}

export interface Plan {
  readonly generated: Date;
  readonly suggestions: readonly Suggestion[];
}
