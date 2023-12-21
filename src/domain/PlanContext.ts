import {createContext} from 'react';
import {Meal} from './Meal';
import {Plan} from './Plan';

export const PlanContext = createContext<Plan>([]);
export const PlanDispatchContext = createContext<React.Dispatch<PlanAction>>(
  () => {},
);

type PlanClearAction = {
  type: 'clear';
};
type PlanGenerateAction = {
  type: 'generate';
  meals: Meal[];
  currentPlan: Plan;
};
type PlanAction = PlanClearAction | PlanGenerateAction;

export function planReducer(plan: Plan, action: PlanAction) {
  switch (action.type) {
    case 'clear': {
      return [];
    }
    case 'generate': {
      return generateSuggestions(action.currentPlan, action.meals);
    }
  }
}

function generateSuggestions(currentPlan: Plan, meals: Meal[]): Plan {
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
