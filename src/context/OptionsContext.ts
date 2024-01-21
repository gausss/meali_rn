import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';

export const OPTIONS_STORAGE_KEY = 'meali.options';

export interface Options {
  numSuggestions: number;
  showWeekdays: boolean;
  startDay: number;
}

export const OptionsContext = createContext<Options>({
  numSuggestions: 6,
  showWeekdays: true,
  startDay: 1,
});
export const OptionsDispatchContext = createContext<
  React.Dispatch<OptionsAction>
>(() => { });

type OptionsUpdateAcion = {
  type: 'update';
  options: Options;
};
type OptionsAction = OptionsUpdateAcion;

export function optionsReducer(state: Options, action: OptionsAction): Options {
  let stateUpdated;
  switch (action.type) {
    case 'update': {
      stateUpdated = { ...action.options };
      break;
    }
  }

  AsyncStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(stateUpdated));
  return stateUpdated;
}
