import {useTheme} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {MealsContext} from '../../domain/MealReducer';
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Section} from '../../shared/Section';
import Icon from 'react-native-vector-icons/Ionicons';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const meals = useContext(MealsContext);
  const [plan, setPlan] = useState<{day: number; mealId: string}[]>([]);

  console.log('Render PlanList');
  return (
    <View
      style={{
        ...GlobalStyles.viewContainer,
        justifyContent: meals.length ? 'flex-start' : 'space-between',
      }}>
      {plan.length ? (
        <FlatList
          data={plan}
          scrollEnabled={true}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: colors.notification,
                height: 1,
              }}
            />
          )}
          renderItem={({item, index}) => (
            <TouchableHighlight
              key={item.day}
              underlayColor={colors.notification}
              onPress={() => {
                console.log(item.mealId);
              }}>
              <View
                style={{
                  padding: 15,
                }}>
                <Text style={{...GlobalStyles.defaultText, color: colors.text}}>
                  {item.day} - {item.mealId}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      ) : (
        <NoPlan />
      )}

      <View style={{...GlobalStyles.viewCentered}}>
        <ActionButton
          name="reload-outline"
          disabled={!meals.length}
          onPress={() => console.log('Pressed')}>
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

function NoMealsPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="pizza-outline" style={{fontSize: 24, color: colors.text}} />
      <Text
        style={{
          fontSize: GlobalStyles.defaultText.fontSize,
          color: colors.text,
        }}>
        {t('plan.noMeals')}
      </Text>
    </View>
  );
}
