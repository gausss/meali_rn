import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {PlanList} from './PlanList';
import {PlanScreenParams} from './PlanScreenParams';

export default function PlanScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<PlanScreenParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={PlanList}
        options={{title: t('plan.headerTitle')}}
      />
    </Stack.Navigator>
  );
}
