import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';
import { Meal } from '../domain/Meal';

export const MEAL_STORAGE_KEY = 'meali.meals';

export const MealsContext = createContext<Meal[]>([]);
export const MealsDispatchContext = createContext<React.Dispatch<MealAction>>(
  () => { },
);

type MealRestoreAction = {
  type: 'restore';
  meals: Meal[];
};
type MealAddAction = {
  type: 'add';
  meal: Meal;
};
type MealEditAction = {
  type: 'edit';
  meal: Meal;
  index: number;
};
type MealDeleteAction = {
  type: 'delete';
  index: number;
};
type MealAction =
  | MealAddAction
  | MealEditAction
  | MealRestoreAction
  | MealDeleteAction;

export function mealReducer(state: readonly Meal[], action: MealAction): Meal[] {
  let stateUpdated;
  switch (action.type) {
    case 'restore': {
      return action.meals;
    }
    case 'add': {
      stateUpdated = [...state, action.meal];
      break;
    }
    case 'edit': {
      const tmpState = [...state];
      tmpState[action.index] = action.meal;
      stateUpdated = tmpState;
      break;
    }
    case 'delete': {
      const tmpState = [...state];
      tmpState.splice(action.index, 1);
      stateUpdated = tmpState;
      break;
    }
  }
  AsyncStorage.setItem(MEAL_STORAGE_KEY, JSON.stringify(stateUpdated));
  return stateUpdated;
}
