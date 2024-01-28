import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {
  OptionsContext,
  OptionsDispatchContext
} from '../../context/OptionsContext';
import {PlanDispatchContext} from '../../context/PlanContext';
import {Select} from '../../shared/Select';
import {GlobalStyles} from '../../shared/Styles';
import {Toggle} from '../../shared/Toggle';

export function PlanOptions(): React.JSX.Element {
  const {t} = useTranslation();
  const options = useContext(OptionsContext);
  const optionsDispatch = useContext(OptionsDispatchContext);
  const planDispatch = useContext(PlanDispatchContext);

  return (
    <View style={{...GlobalStyles.viewContainer, marginHorizontal: 15}}>
      <Select
        label={t('plan.options.numSuggestions')}
        defaultButtonText=" "
        data={[1, 2, 3, 4, 5, 6, 7]}
        onSelect={selectedItem => {
          optionsDispatch({
            type: 'update',
            options: {...options, numSuggestions: selectedItem}
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
            options: {...options, showWeekdays: value}
          })
        }
      />
      <Select
        label={t('plan.options.startDay')}
        defaultButtonText=" "
        data={[0, 1]}
        rowTextForSelection={item => {
          return t(`plan.days.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`plan.days.${item}`);
        }}
        onSelect={selectedItem => {
          optionsDispatch({
            type: 'update',
            options: {...options, startDay: selectedItem}
          });
        }}
        defaultValue={options.startDay}
      />
    </View>
  );
}
