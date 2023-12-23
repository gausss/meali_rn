import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {
  OptionsContext,
  OptionsDispatchContext,
} from '../../domain/OptionsContext';
import {PlanDispatchContext} from '../../domain/PlanContext';
import {Button} from '../../shared/Button';
import {GlobalStyles} from '../../shared/Styles';
import {Select} from '../../shared/Select';
import {PlanScreenParams} from './PlanScreenParams';

export function PlanOptions(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<PlanScreenParams>>();
  const options = useContext(OptionsContext);
  const optionsDispatch = useContext(OptionsDispatchContext);
  const planDispatch = useContext(PlanDispatchContext);
  let numSuggestions = options.numSuggestions;

  console.log('Render PlanOptions');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Select
        label={t('plan.options.numSuggestions')}
        defaultButtonText=" "
        data={[1, 2, 3, 4, 5, 6, 7]}
        onSelect={selectedItem => {
          numSuggestions = selectedItem;
        }}
        defaultValue={options.numSuggestions}
      />
      <View style={GlobalStyles.viewCentered}>
        <Button
          name=""
          disabled={!options.numSuggestions}
          onPress={() => {
            optionsDispatch({
              type: 'update',
              options: {...options, numSuggestions: numSuggestions},
            });
            planDispatch({type: 'clear'});
            navigation.navigate('List');
          }}>
          {t('save')}
        </Button>
      </View>
    </View>
  );
}
