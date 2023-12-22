import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  OptionsContext,
  OptionsDispatchContext,
  optionsReducer,
} from '../../domain/OptionsContext';
import {
  PlanContext,
  PlanDispatchContext,
  planReducer,
} from '../../domain/PlanContext';
import {PlanList} from './PlanList';
import {PlanScreenParams} from './PlanScreenParams';
import {PlanOptions} from './PlanOptions';

export default function PlanScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<PlanScreenParams>>();
  const Stack = createNativeStackNavigator<PlanScreenParams>();
  const [plan, planDispatch] = useReducer(planReducer, []);
  const [options, optionsDispatch] = useReducer(optionsReducer, {
    numSuggestions: 5,
  });

  const resetPlanButton = () => {
    return (
      <View style={{flexDirection: 'row', gap: 15}}>
        {plan.length ? (
          <Icon
            color={colors.primary}
            size={20}
            name="reload-outline"
            onPress={() => planDispatch({type: 'clear'})}
          />
        ) : null}

        <Icon
          color={colors.primary}
          size={21}
          name="ellipsis-horizontal-circle-outline"
          onPress={() => navigation.navigate('Options')}
        />
      </View>
    );
  };

  console.log('Render PlanScreen');
  return (
    <OptionsContext.Provider value={options}>
      <OptionsDispatchContext.Provider value={optionsDispatch}>
        <PlanContext.Provider value={plan}>
          <PlanDispatchContext.Provider value={planDispatch}>
            <Stack.Navigator>
              <Stack.Screen
                name="List"
                component={PlanList}
                options={{
                  title: t('plan.headerTitle'),
                  headerRight: resetPlanButton,
                }}
              />
              <Stack.Screen
                name="Options"
                component={PlanOptions}
                options={{
                  presentation: 'modal',
                  title: t('plan.options.title'),
                }}
              />
            </Stack.Navigator>
          </PlanDispatchContext.Provider>
        </PlanContext.Provider>
      </OptionsDispatchContext.Provider>
    </OptionsContext.Provider>
  );
}
