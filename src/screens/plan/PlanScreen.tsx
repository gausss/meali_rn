import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  useNavigation,
  useTheme
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext, useEffect, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTourGuideController} from 'rn-tourguide';
import {
  OPTIONS_STORAGE_KEY,
  OptionsContext,
  OptionsDispatchContext,
  optionsReducer
} from '../../context/OptionsContext';
import {PlanContext, PlanDispatchContext} from '../../context/PlanContext';
import {GlobalStyles} from '../../shared/Styles';
import {PlanList} from './PlanList';
import {PlanOptions} from './PlanOptions';
import {PlanScreenParams} from './PlanScreenParams';
import {ShowMeal} from './ShowMeal';

export default function PlanScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<PlanScreenParams>>();
  const Stack = createNativeStackNavigator<PlanScreenParams>();
  const plan = useContext(PlanContext);
  const planDispatch = useContext(PlanDispatchContext);
  const {TourGuideZone} = useTourGuideController('plan');

  const [options, optionsDispatch] = useReducer(optionsReducer, {
    numSuggestions: 5,
    showWeekdays: true,
    startDay: 0
  });

  const {start} = useTourGuideController('plan');

  useEffect(() => {
    AsyncStorage.getItem(OPTIONS_STORAGE_KEY).then(value => {
      if (value) {
        optionsDispatch({
          type: 'update',
          options: JSON.parse(value)
        });
      }
    });
  }, []);

  const planActions = () => {
    return (
      <View style={GlobalStyles.row}>
        {plan.generated ? (
          <View style={GlobalStyles.row}>
            <TourGuideZone zone={5} text={t('guide.reset')} shape="circle">
              <Icon.Button
                backgroundColor={'transparent'}
                underlayColor={'transparent'}
                iconStyle={GlobalStyles.headeIcon}
                color={colors.text}
                size={22}
                name="trash-outline"
                onPress={() => {
                  planDispatch({
                    type: 'clear'
                  });
                }}
              />
            </TourGuideZone>

            <Icon.Button
              backgroundColor={'transparent'}
              underlayColor={'transparent'}
              iconStyle={GlobalStyles.headeIcon}
              color={colors.text}
              size={28}
              name="help-circle-outline"
              onPress={() => start()}
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
        color: colors.text
      }}>
      {t('plan.headerTitle')}
    </Text>
  );

  return (
    <OptionsContext.Provider value={options}>
      <OptionsDispatchContext.Provider value={optionsDispatch}>
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
              headerLeft: planTitle
            }}
          />
          <Stack.Screen
            name="Options"
            component={PlanOptions}
            options={{
              headerStyle: {backgroundColor: colors.background},
              headerShadowVisible: false,
              title: t('plan.options.title')
            }}
          />
          <Stack.Screen
            name="Meal"
            component={ShowMeal}
            options={{
              presentation: 'modal',
              headerStyle: {backgroundColor: colors.background},
              headerShadowVisible: false,
              title: t('meals.detail')
            }}
          />
        </Stack.Navigator>
      </OptionsDispatchContext.Provider>
    </OptionsContext.Provider>
  );
}
