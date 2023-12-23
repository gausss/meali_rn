import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {MealsContext} from '../../domain/MealContext';
import {OptionsContext} from '../../domain/OptionsContext';
import {PlanContext, PlanDispatchContext} from '../../domain/PlanContext';
import {Button} from '../../shared/Button';
import {Card} from '../../shared/Card';
import {ListItemSeparator} from '../../shared/List';
import {GlobalStyles} from '../../shared/Styles';
import {PlanRow} from './PlanRow';
import {HomeTabParams} from '../../App';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const meals = useContext(MealsContext);
  const plan = useContext(PlanContext);
  const options = useContext(OptionsContext);
  const planDispatch = useContext(PlanDispatchContext);

  console.log('Render PlanList');
  return (
    <View
      style={{
        ...GlobalStyles.viewContainer,
      }}>
      {plan.length ? (
        <Card>
          <FlatList
            style={GlobalStyles.listStyle}
            data={plan}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <TouchableHighlight
                key={item.index}
                underlayColor={colors.notification}
                onPress={() => {
                  item.pinned = !item.pinned;
                }}>
                <PlanRow suggestion={item} />
              </TouchableHighlight>
            )}
          />
        </Card>
      ) : (
        <NoPlan />
      )}

      <View style={GlobalStyles.viewCentered}>
        <Button
          name="sparkles"
          disabled={!meals.length}
          onPress={() =>
            planDispatch({
              type: 'generate',
              currentPlan: plan,
              meals: meals,
              options: options,
            })
          }>
          {t('plan.generate')}
        </Button>
      </View>
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<HomeTabParams>>();
  const meals = useContext(MealsContext);

  return (
    <View>
      <Text style={{...GlobalStyles.sectionBody, color: colors.text}}>
        {t('plan.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/plan-fly.png')}
          style={{...GlobalStyles.placeholderImage}}
        />
      </View>
      {!meals.length ? (
        <View style={GlobalStyles.viewCentered}>
          <Text
            style={{...GlobalStyles.sectionBody, color: colors.primary}}
            onPress={() => navigation.navigate('Meals')}>
            {t('plan.noMeals')}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
