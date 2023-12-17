import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {IdGenerator} from '../../shared/IdGenerator';
import {Section} from '../../shared/Section';
import {Complexity, Meal} from '../../domain/Meal';
import {Card} from '../../shared/Card';
import {Button} from '../../shared/Button';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';

type MealStackParams = {
  List: {newMeal?: Meal};
  Add: undefined;
};

export default function MealTab(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<MealStackParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={MealList}
        options={{title: t('meals.tabTitle')}}
      />
      <Stack.Screen
        name="Add"
        component={MealAdd}
        options={{
          presentation: 'modal',
          title: t('meals.create'),
        }}
      />
    </Stack.Navigator>
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

function MealList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealStackParams>>();
  const route = useRoute<RouteProp<MealStackParams, 'List'>>();

  const [meals, setMeals] = useState<Meal[]>([]);

  React.useEffect(() => {
    if (route.params?.newMeal) {
      setMeals([...meals, route.params.newMeal]);
      navigation.setParams({newMeal: undefined});
    }
  }, [meals, navigation, route?.params?.newMeal]);

  return (
    <View>
      {meals.length ? (
        <Card>
          <FlatList
            data={meals}
            renderItem={({item}) => (
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
        <Button name="add-outline" onPress={() => navigation.navigate('Add')}>
          {t('meals.add')}
        </Button>
      </View>
    </View>
  );
}

function MealAdd(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealStackParams>>();

  const [name, setName] = useState('');
  const [complex, setComplex] = useState<Complexity>();

  return (
    <View style={styles.container}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value => setName(value)}
        defaultValue={name}
      />
      <Input placeholder={t('meals.ingredients')} />
      <Select
        defaultButtonText={t('meals.complexity.name')}
        data={['EASY', 'HARD']}
        rowTextForSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        onSelect={selectedItem => {
          setComplex(selectedItem);
        }}
      />

      <View style={styles.viewStyleCenter}>
        <Button
          name="add-outline"
          onPress={() =>
            navigation.navigate({
              name: 'List',
              params: {
                newMeal: {
                  id: IdGenerator.generate(),
                  name: name,
                  ingredients: [],
                  complexity: complex,
                },
              },
              merge: true,
            })
          }>
          {t('meals.save')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    paddingHorizontal: 25,
    padding: 25,
    gap: 20,
  },
});
