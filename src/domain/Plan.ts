import {Meal} from './Meal';

export interface Suggestion {
  index: number;
  meal: Meal;
  pinned: boolean;
}

export interface Plan {
  generated: Date;
  suggestions: Suggestion[];
}
