import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';
import { Meal } from '../domain/Meal';
import { Plan } from '../domain/Plan';
import { Options } from './OptionsContext';

export const PLAN_STORAGE_KEY = 'meali.plan';

export const PlanContext = createContext<Plan>({} as Plan);
export const PlanDispatchContext = createContext<React.Dispatch<PlanAction>>(
  () => { }
);

type PlanResetPinsAction = {
  type: 'resetPins';
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
type PlanClearAction = {
  type: 'clear';
};
type PlanLengthAction = {
  type: 'length';
  length: number;
};
type PlanRestoreAction = {
  type: 'restore';
  plan: Plan;
};
type PlanAction =
  | PlanResetPinsAction
  | PlanGenerateAction
  | PlanPinAction
  | PlanLengthAction
  | PlanRestoreAction
  | PlanClearAction
  | PlanInitAction;

export function planReducer(state: Plan, action: PlanAction): Plan {
  let stateUpdated = state;
  switch (action.type) {
    case 'restore': {
      return action.plan;
    }
    case 'resetPins': {
      stateUpdated = {
        ...state,
        suggestions: state.suggestions.map(suggestion => {
          suggestion.pinned = false;
          return suggestion;
        })
      };
      break;
    }
    case 'clear': {
      stateUpdated = {} as Plan;
      break;
    }
    case 'init': {
      stateUpdated = generateSuggestions(
        { generated: new Date(), suggestions: [] },
        action.meals,
        action.options
      );
      break;
    }
    case 'generateMore': {
      stateUpdated = generateSuggestions(state, action.meals, action.options);
      break;
    }
    case 'togglePin': {
      let suggestion = state.suggestions[action.index];
      if (suggestion) {
        suggestion.pinned = !suggestion.pinned;
      }

      stateUpdated = { ...state, suggestions: [...state.suggestions] };
      break;
    }
    case 'length': {
      if (state.suggestions) {
        stateUpdated = {
          ...state,
          suggestions: state.suggestions.slice(0, action.length)
        };
      }
      break;
    }
  }

  AsyncStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(stateUpdated));
  return stateUpdated;
}

function generateSuggestions(
  currentPlan: Readonly<Plan>,
  meals: Meal[],
  options: Options
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
      pinned: false
    });
  }

  return { ...currentPlan, suggestions };
}