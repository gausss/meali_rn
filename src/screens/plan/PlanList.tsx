import {useTheme} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {MealsContext} from '../../domain/MealReducer';
import {Plan, generateSuggestions} from '../../domain/Plan';
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {ListItemSeparator} from '../../shared/List';
import {Section} from '../../shared/Section';
import {NoMealsPlan} from './NoMeals';
import {PlanRow} from './PlanRow';
import Icon from 'react-native-vector-icons/Ionicons';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const meals = useContext(MealsContext);
  const [plan, setPlan] = useState<Plan>([]);

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
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            renderItem={({item}) => (
              <TouchableHighlight
                key={item.index}
                underlayColor={colors.notification}
                onPress={() => {
                  item.pinned = true;
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
          onPress={() => setPlan(generateSuggestions(plan, [...meals]))}>
          {plan.length ? t('plan.refresh') : t('plan.generate')}
        </ActionButton>
        {plan.length ? (
          <View>
            <Icon.Button
              name="trash-outline"
              iconStyle={{color: '#BD271E'}}
              style={{
                backgroundColor: colors.background,
              }}
              onPress={() => setPlan([])}
            />
          </View>
        ) : null}
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
