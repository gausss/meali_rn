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
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {ListItemSeparator} from '../../shared/List';
import {PlanRow} from './PlanRow';
import {AppTabParams} from '../../App';

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
      <View>
        {plan.length && meals.length ? (
          <FlatList
            data={plan}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <ListItemSeparator />}
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
        ) : (
          <NoPlan />
        )}
      </View>

      <View style={GlobalStyles.viewCentered}>
        <ActionButton
          name="sparkles-outline"
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
        </ActionButton>
      </View>
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<AppTabParams>>();
  const meals = useContext(MealsContext);

  return (
    <View>
      <Text style={{...GlobalStyles.sectionTitle, color: colors.text}}>
        {t('plan.introHeading')}
      </Text>
      <Text style={{...GlobalStyles.sectionBody, color: colors.text}}>
        {t('plan.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/Farfalle.png')}
          style={{...GlobalStyles.placeholderImage, tintColor: colors.text}}
        />
      </View>
      {!meals.length ? (
        <View style={{alignItems: 'center'}}>
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
