import {Meal} from '../../domain/Meal';

export type MealScreenParams = {
  List: {newMeal?: Meal};
  Add: undefined;
};
