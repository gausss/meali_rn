import {createContext} from 'react';
import {Meal} from './Meal';

export const MealsContext = createContext<Meal[]>([]);
export const MealsDispatchContext = createContext<React.Dispatch<MealAction>>(
  () => {},
);

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
type MealAction = MealAddAction | MealEditAction | MealDeleteAction;

export function mealReducer(state: Meal[], action: MealAction): Meal[] {
  switch (action.type) {
    case 'add': {
      return [...state, action.meal];
    }
    case 'edit': {
      state[action.index] = action.meal;
      return [...state];
    }
    case 'delete': {
      state.splice(action.index, 1);
      return [...state];
    }
  }
}
