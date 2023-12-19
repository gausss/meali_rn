import {Meal} from './Meal';

export interface Suggestion {
  index: number;
  meal: Meal;
}

export type Plan = Suggestion[];

export function generatePlan(meals: Meal[]): Plan {
  const plan: Plan = [];
  for (let index = 0; index < 5; index++) {
    const randomIndex = Math.floor(Math.random() * meals.length);
    plan.push({index, meal: meals[randomIndex]});
  }

  return plan;
}
