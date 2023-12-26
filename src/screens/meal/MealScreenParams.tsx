import {Ingredient} from '../../domain/Meal';

export type MealScreenParams = {
  List: undefined;
  Detail: {index?: Number};
  Ingredient: {
    updateIngredient: (ingredient: Ingredient) => void;
  };
};
