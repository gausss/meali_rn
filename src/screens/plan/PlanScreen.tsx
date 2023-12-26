import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  OPTIONS_STORAGE_KEY,
  Options,
  OptionsContext,
  OptionsDispatchContext,
  optionsReducer,
} from '../../domain/OptionsContext';
import {Plan} from '../../domain/Plan';
import {
  PLAN_STORAGE_KEY,
  PlanContext,
  PlanDispatchContext,
  planReducer,
} from '../../domain/PlanContext';
import {GlobalStyles} from '../../shared/Styles';
import {PlanList} from './PlanList';
import {PlanOptions} from './PlanOptions';
import {PlanScreenParams} from './PlanScreenParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BuyList} from './BuyList';

export default function PlanScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<PlanScreenParams>>();
  const Stack = createNativeStackNavigator<PlanScreenParams>();
  const [plan, planDispatch] = useReducer(planReducer, {} as Plan);
  const [options, optionsDispatch] = useReducer(optionsReducer, {
    numSuggestions: 5,
    showWeekdays: true,
  });

  useEffect(() => {
    AsyncStorage.getItem(OPTIONS_STORAGE_KEY).then(value => {
      console.log('Loading Options from storage');
      if (value) {
        optionsDispatch({
          type: 'update',
          options: JSON.parse(value),
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(PLAN_STORAGE_KEY).then(value => {
      console.log('Loading Plan from storage');
      if (value) {
        planDispatch({
          type: 'restore',
          plan: JSON.parse(value),
        });
      }
    });
  }, []);

  const planActions = () => {
    return (
      <View style={GlobalStyles.row}>
        {plan.generated ? (
          <View style={GlobalStyles.row}>
            <Icon.Button
              backgroundColor={'transparent'}
              underlayColor={'transparent'}
              iconStyle={GlobalStyles.headeIcon}
              color={colors.text}
              size={22}
              name="receipt-outline"
              onPress={() => navigation.navigate('Buy')}
            />
            <Icon.Button
              backgroundColor={'transparent'}
              underlayColor={'transparent'}
              iconStyle={GlobalStyles.headeIcon}
              color={colors.text}
              size={22}
              name="reload-outline"
              onPress={() => planDispatch({type: 'clear'})}
            />
          </View>
        ) : null}

        <Icon.Button
          backgroundColor={'transparent'}
          underlayColor={'transparent'}
          iconStyle={GlobalStyles.headeIcon}
          color={colors.text}
          size={22}
          name="settings-outline"
          onPress={() => navigation.navigate('Options')}
        />
      </View>
    );
  };

  const planTitle = () => (
    <Text
      style={{
        ...GlobalStyles.statusBarTitle,
        color: colors.text,
      }}>
      {t('plan.headerTitle')}
    </Text>
  );

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
                  title: '',
                  headerTitleStyle: {fontSize: 22},
                  headerStyle: {backgroundColor: colors.background},
                  headerShadowVisible: false,
                  headerRight: planActions,
                  headerLeft: planTitle,
                }}
              />
              <Stack.Screen
                name="Options"
                component={PlanOptions}
                options={{
                  headerStyle: {backgroundColor: colors.background},
                  headerShadowVisible: false,
                  title: t('plan.options.title'),
                }}
              />
              <Stack.Screen
                name="Buy"
                component={BuyList}
                options={{
                  headerStyle: {backgroundColor: colors.background},
                  presentation: 'modal',
                  headerShadowVisible: false,
                  title: t('buy.title'),
                }}
              />
            </Stack.Navigator>
          </PlanDispatchContext.Provider>
        </PlanContext.Provider>
      </OptionsDispatchContext.Provider>
    </OptionsContext.Provider>
  );
}
