import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext} from 'react';
import {Meal} from './Meal';

export const MEAL_STORAGE_KEY = 'meali.meals';

export const MealsContext = createContext<Meal[]>([]);
export const MealsDispatchContext = createContext<React.Dispatch<MealAction>>(
  () => {},
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

export function mealReducer(state: Meal[], action: MealAction): Meal[] {
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
      state[action.index] = action.meal;
      stateUpdated = [...state];
      break;
    }
    case 'delete': {
      state.splice(action.index, 1);
      stateUpdated = [...state];
      break;
    }
  }
  AsyncStorage.setItem(MEAL_STORAGE_KEY, JSON.stringify(stateUpdated));
  return stateUpdated;
}
