import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {Meal} from '../../domain/Meal';
import {Card} from '../../shared/Card';
import {GlobalColors, GlobalStyles} from '../../shared/GlobalStyles';
import {MainButton} from '../../shared/MainButton';
import {Section} from '../../shared/Section';
import {MealScreenParams} from './MealScreenParams';

export function MealList(): React.JSX.Element {
  const {colors, dark} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'List'>>();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (route.params?.newMeal) {
      const newMeal = route.params.newMeal;
      setMeals(current => {
        current.push(newMeal);
        return current;
      });
      navigation.setParams({newMeal: undefined});
    }
  }, [navigation, route?.params?.newMeal]);

  useEffect(() => {
    if (route?.params?.editIndex !== undefined) {
      const editIndex = route.params.editIndex;
      if (!route.params?.editMeal) {
        setMeals(current => {
          current.splice(editIndex, 1);
          return current;
        });
        navigation.setParams({editMeal: undefined, editIndex: undefined});
      } else {
        const editMeal = route.params.editMeal;
        setMeals(current => {
          current[editIndex] = editMeal;
          return current;
        });
        navigation.setParams({editMeal: undefined, editIndex: undefined});
      }
    }
  }, [navigation, route?.params?.editMeal, route?.params?.editIndex]);

  return (
    <View style={GlobalStyles.viewContainer}>
      {meals.length ? (
        <Card>
          <FlatList
            data={meals}
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
                key={item.id}
                underlayColor={colors.notification}
                onPress={() => {
                  navigation.navigate({
                    name: 'Edit',
                    params: {
                      editMeal: {...item},
                      editIndex: index,
                    },
                    merge: true,
                  });
                }}>
                <View
                  style={{
                    padding: 15,
                  }}>
                  <Text
                    style={{...GlobalStyles.defaultText, color: colors.text}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </Card>
      ) : (
        <MealsNotFound />
      )}

      <View style={GlobalStyles.viewCentered}>
        <MainButton
          name="add-outline"
          onPress={() => navigation.navigate('Add')}>
          {t('meals.add')}
        </MainButton>
      </View>
    </View>
  );
}

function MealsNotFound(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <Section title={t('meals.introHeading')}>
        <Text>{t('meals.introDescription')}</Text>
      </Section>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/Ravioli.png')}
          style={{...GlobalStyles.placeholderImage, tintColor: colors.text}}
        />
      </View>
    </View>
  );
}
