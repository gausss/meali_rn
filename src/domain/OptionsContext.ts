import {createContext} from 'react';

export interface Options {
  numSuggestions: number;
  showWeekdays: boolean;
}

export const OptionsContext = createContext<Options>({
  numSuggestions: 6,
  showWeekdays: true,
});
export const OptionsDispatchContext = createContext<
  React.Dispatch<OptionsAction>
>(() => {});

type OptionsUpdateAcion = {
  type: 'update';
  options: Options;
};
type OptionsAction = OptionsUpdateAcion;

export function optionsReducer(state: Options, action: OptionsAction): Options {
  switch (action.type) {
    case 'update': {
      return {...action.options};
    }
  }
}
