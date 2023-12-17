import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Meal} from '../../domain/Meal';
import {Card} from '../../shared/Card';
import {MainButton} from '../../shared/MainButton';
import {Section} from '../../shared/Section';
import {MealScreenParams} from './MealScreenParams';

export function MealList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'List'>>();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (route.params?.newMeal) {
      setMeals([...meals, route.params.newMeal]);
      navigation.setParams({newMeal: undefined});
    }
  }, [meals, navigation, route?.params?.newMeal]);

  return (
    <View style={styles.container}>
      {meals.length ? (
        <Card>
          <FlatList
            data={meals}
            ItemSeparatorComponent={() => (
              <View style={{backgroundColor: 'green', height: 2}} />
            )}
            renderItem={({item, separators}) => (
              <Text style={{...styles.textStyle, color: colors.text}}>
                {item.name}
              </Text>
            )}
          />
        </Card>
      ) : (
        <MealsNotFound />
      )}

      <View style={styles.viewStyleCenter}>
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
      <View style={styles.viewStyleCenter}>
        <Image
          source={require('../../img/Ravioli.png')}
          style={{...styles.mainImage, tintColor: colors.text}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 20,
  },
  textStyle: {
    fontSize: 14,
  },
  viewStyleCenter: {
    alignItems: 'center',
  },
  mainImage: {
    height: 380,
    resizeMode: 'contain',
  },
});
