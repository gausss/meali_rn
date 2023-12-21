import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  PlanContext,
  PlanDispatchContext,
  planReducer,
} from '../../domain/PlanContext';
import {PlanList} from './PlanList';
import {PlanScreenParams} from './PlanScreenParams';

export default function PlanScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<PlanScreenParams>();
  const [plan, dispatch] = useReducer(planReducer, []);

  const resetPlanButton = () => {
    return plan.length ? (
      <View>
        <Icon
          color="red"
          size={22}
          name="trash-outline"
          onPress={() => dispatch({type: 'clear'})}
        />
      </View>
    ) : null;
  };

  console.log('Render PlanScreen');
  return (
    <PlanContext.Provider value={plan}>
      <PlanDispatchContext.Provider value={dispatch}>
        <Stack.Navigator>
          <Stack.Screen
            name="List"
            component={PlanList}
            options={{
              title: t('plan.headerTitle'),
              headerRight: resetPlanButton,
            }}
          />
        </Stack.Navigator>
      </PlanDispatchContext.Provider>
    </PlanContext.Provider>
  );
}
