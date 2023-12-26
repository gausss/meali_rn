import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {MealsContext} from '../../domain/MealContext';
import {Button} from '../../shared/Button';
import {Card} from '../../shared/Card';
import {ListItemSeparator} from '../../shared/List';
import {GlobalStyles} from '../../shared/Styles';
import {MealRow} from './MealRow';
import {MealScreenParams} from './MealScreenParams';

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
            style={GlobalStyles.listStyle}
            data={meals}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item, index}) => (
              <TouchableHighlight
                key={item.id}
                underlayColor={colors.notification}
                onPress={() => {
                  navigation.navigate({
                    name: 'Detail',
                    params: {
                      index,
                    },
                    merge: true,
                  });
                }}>
                <MealRow meal={item} />
              </TouchableHighlight>
            )}
          />
        </Card>
      ) : (
        <NoMeals />
      )}

      <View style={GlobalStyles.viewCentered}>
        <Button
          icon="add-outline"
          label={t('meals.add')}
          onPress={() => navigation.navigate('Detail', {})}
        />
      </View>
    </View>
  );
}

function NoMeals(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <Text style={{...GlobalStyles.sectionBody, color: colors.text}}>
        {t('meals.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/taco-clean.png')}
          style={{
            ...GlobalStyles.placeholderImageMeal,
          }}
        />
      </View>
    </View>
  );
}
