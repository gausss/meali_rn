import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {ActionButton} from '../../shared/ActionButton';
import {Card} from '../../shared/Card';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Section} from '../../shared/Section';
import {MealScreenParams} from './MealScreenParams';
import {MealsContext} from '../../domain/MealReducer';

export function MealList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const meals = useContext(MealsContext);

  console.log('Render MealList');
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
            renderItem={({item: meal, index}) => (
              <TouchableHighlight
                key={meal.id}
                underlayColor={colors.notification}
                onPress={() => {
                  navigation.navigate({
                    name: 'Edit',
                    params: {
                      index,
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
                    {meal.name}
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
        <ActionButton
          name="add-outline"
          onPress={() => navigation.navigate('Add')}>
          {t('meals.add')}
        </ActionButton>
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
