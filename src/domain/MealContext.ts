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

export function mealReducer(meals: Meal[], action: MealAction) {
  switch (action.type) {
    case 'add': {
      return [...meals, action.meal];
    }
    case 'edit': {
      meals[action.index] = action.meal;
      return [...meals];
    }
    case 'delete': {
      meals.splice(action.index, 1);
      return [...meals];
    }
  }
}
