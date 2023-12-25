import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {
  OptionsContext,
  OptionsDispatchContext,
} from '../../domain/OptionsContext';
import {PlanDispatchContext} from '../../domain/PlanContext';
import {Select} from '../../shared/Select';
import {GlobalStyles} from '../../shared/Styles';
import {Toggle} from '../../shared/Toggle';

export function PlanOptions(): React.JSX.Element {
  const {t} = useTranslation();
  const options = useContext(OptionsContext);
  const optionsDispatch = useContext(OptionsDispatchContext);
  const planDispatch = useContext(PlanDispatchContext);

  console.log('Render PlanOptions');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Select
        label={t('plan.options.numSuggestions')}
        defaultButtonText=" "
        data={[1, 2, 3, 4, 5, 6, 7]}
        onSelect={selectedItem => {
          optionsDispatch({
            type: 'update',
            options: {...options, numSuggestions: selectedItem},
          });
          planDispatch({type: 'length', length: selectedItem});
        }}
        defaultValue={options.numSuggestions}
      />
      <Toggle
        label={t('plan.options.showWeekdays')}
        value={options.showWeekdays}
        onValueChange={value =>
          optionsDispatch({
            type: 'update',
            options: {...options, showWeekdays: value},
          })
        }
      />
    </View>
  );
}
