import {createContext} from 'react';
import {Meal} from './Meal';
import {Options} from './OptionsContext';
import {Plan} from './Plan';

export const PlanContext = createContext<Plan>({} as Plan);
export const PlanDispatchContext = createContext<React.Dispatch<PlanAction>>(
  () => {},
);

type PlanClearAction = {
  type: 'clear';
};
type PlanInitAction = {
  type: 'init';
  meals: Meal[];
  options: Options;
};
type PlanGenerateAction = {
  type: 'generateMore';
  meals: Meal[];
  options: Options;
};
type PlanPinAction = {
  type: 'togglePin';
  index: number;
};
type PlanAction =
  | PlanClearAction
  | PlanGenerateAction
  | PlanPinAction
  | PlanInitAction;

export function planReducer(state: Plan, action: PlanAction): Plan {
  switch (action.type) {
    case 'clear': {
      return {} as Plan;
    }
    case 'init': {
      return generateSuggestions(
        {generated: new Date(), suggestions: []},
        action.meals,
        action.options,
      );
    }
    case 'generateMore': {
      return generateSuggestions(state, action.meals, action.options);
    }
    case 'togglePin': {
      let suggestion = state.suggestions[action.index];
      if (suggestion) {
        suggestion.pinned = !suggestion.pinned;
      }
      return {...state, suggestions: [...state.suggestions]};
    }
  }
}

function generateSuggestions(
  currentPlan: Readonly<Plan>,
  meals: Meal[],
  options: Options,
): Plan {
  const suggestions = [];
  for (let index = 0; index < options.numSuggestions; index++) {
    if (
      currentPlan.suggestions.length > index &&
      currentPlan.suggestions[index].pinned
    ) {
      suggestions.push(currentPlan.suggestions[index]);
      continue;
    }

    const randomIndex = Math.floor(Math.random() * meals.length);
    suggestions.push({
      index,
      meal: meals[randomIndex],
      pinned: false,
    });
  }

  return {...currentPlan, suggestions};
}
