import {Meal} from '../../domain/Meal';

export type MealScreenParams = {
  List: {newMeal?: Meal; editMeal?: Meal; editIndex?: number};
  Add: undefined;
  Edit: {editMeal: Meal; editIndex: number};
};
