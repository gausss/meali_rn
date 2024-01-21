import i18next from 'i18next';
import { createContext } from 'react';
import { Ingredient } from '../domain/Meal';
import { Plan } from '../domain/Plan';

export interface BuyItem {
  checked: boolean,
  value: string
}

export const BuyContext = createContext<BuyItem[]>([]);
export const BuyDispatchContext = createContext<React.Dispatch<BuyAction>>(
  () => { },
);

type BuyRegenerateAction = {
  type: 'regenerate';
  plan: Plan;
};
type BuyUpdateAction = {
  type: 'update';
  index: number;
};
type BuyAction =
  | BuyRegenerateAction
  | BuyUpdateAction;

export function buyReducer(state: BuyItem[], action: BuyAction): BuyItem[] {
  switch (action.type) {
    case 'regenerate': {
      const buyList = generateBuyList(action.plan);
      return buyList;

    }
    case 'update': {
      const item = state[action.index];
      item.checked = !item.checked;
      return [...state];
    }
  }
}

function generateBuyList(
  currentPlan: Readonly<Plan>,
): BuyItem[] {
  if (!currentPlan.suggestions) {
    return [];
  }

  return [
    ...currentPlan.suggestions.filter(suggestion => suggestion.pinned)
      .flatMap(suggestion => suggestion.meal.ingredients)
      .reduce((acc, curr) => {
        if (curr?.name) {
          const key = curr.name.trim();
          acc.set(key, [...(acc.get(key) || []), curr]);
        }

        return acc;
      }, new Map<String, Ingredient[]>())
      .values()
  ].map(
    ingredients =>
      `${ingredients.reduce((acc, item) => acc + item.count, 0)} ${i18next.t(
        'meals.ingredient.unitType.' + ingredients[0].unit
      )} ${ingredients[0].name}`
  ).map((ingredient) => ({ value: ingredient, checked: false }));

}
