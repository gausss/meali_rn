import {Meal} from './Meal';

export interface Suggestion {
  index: number;
  meal: Meal;
  pinned: boolean;
}

export type Plan = Suggestion[];

export function generateSuggestions(currentPlan: Plan, meals: Meal[]): Plan {
  const suggestions: Plan = [];
  for (let index = 0; index < 6; index++) {
    if (currentPlan.length > index && currentPlan[index].pinned) {
      suggestions.push(currentPlan[index]);
      continue;
    }

    const randomIndex = Math.floor(Math.random() * meals.length);
    suggestions.push({index, meal: meals[randomIndex], pinned: false});
  }

  return suggestions;
}
