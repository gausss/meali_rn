import {useTheme} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {MealsContext} from '../../domain/MealContext';
import {PlanContext, PlanDispatchContext} from '../../domain/PlanContext';
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {ListItemSeparator} from '../../shared/List';
import {Section} from '../../shared/Section';
import {NoMealsPlan} from './NoMeals';
import {PlanRow} from './PlanRow';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const meals = useContext(MealsContext);
  const plan = useContext(PlanContext);
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
            planDispatch({type: 'generate', currentPlan: plan, meals: meals})
          }>
          {t('plan.generate')}
        </ActionButton>
      </View>

      {!meals.length ? <NoMealsPlan /> : null}
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <Section title={t('plan.introHeading')}>
        <Text>{t('plan.introDescription')} </Text>
      </Section>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/Farfalle.png')}
          style={{...GlobalStyles.placeholderImage, tintColor: colors.text}}
        />
      </View>
    </View>
  );
}
