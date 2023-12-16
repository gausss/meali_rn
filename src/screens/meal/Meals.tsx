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
import {FlatList, Image, StatusBar, Text, TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {IdGenerator} from '../../shared/IdGenerator';
import {Section} from '../../shared/Section';
import {Complexity, Meal} from '../../domain/Meal';

type MealStackParams = {
  List: {newMeal: Meal};
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

function MealList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MealStackParams, 'List'>>();

  const [meals, setMeals] = useState<Meal[]>([]);

  React.useEffect(() => {
    if (route.params?.newMeal) {
      setMeals([...meals, route.params.newMeal]);
      navigation.setParams({newMeal: undefined});
    }
  }, [meals, navigation, route?.params?.newMeal]);

  return (
    <View
      style={{
        backgroundColor: colors.background,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <Section title={t('meals.introHeading')}>
        <Text>{t('meals.introDescription')}</Text>
      </Section>
      <FlatList
        data={meals}
        renderItem={({item}) => (
          <View
            style={{
              height: 50,
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 15,
            }}>
            <Text style={{color: colors.text, fontSize: 14}}>{item.name}</Text>
          </View>
        )}
      />
      <View
        style={{
          alignItems: 'center',
          gap: 20,
        }}>
        <Image
          source={require('../../img/Ravioli.png')}
          style={{
            height: 380,
            resizeMode: 'contain',
            tintColor: colors.text,
          }}
        />
        <Icon.Button
          style={{paddingVertical: 15, paddingHorizontal: 25}}
          name="add-outline"
          borderRadius={25}
          backgroundColor={colors.primary}
          onPress={() => navigation.navigate('Add')}>
          {t('meals.add')}
        </Icon.Button>
      </View>
    </View>
  );
}

function MealAdd(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealStackParams>>();

  const [name, setName] = useState('');
  const [complex, setComplex] = useState<Complexity>();

  return (
    <View style={{height: '100%', padding: 15, gap: 20}}>
      <TextInput
        inputMode="text"
        clearButtonMode="always"
        placeholderTextColor="grey"
        style={{
          height: 50,
          color: colors.text,
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 15,
          fontSize: 14,
        }}
        placeholder={t('meals.name')}
        onChangeText={value => setName(value)}
        defaultValue={name}
      />
      <TextInput
        inputMode="text"
        clearButtonMode="always"
        placeholderTextColor="grey"
        style={{
          height: 50,
          color: colors.text,
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 15,
          fontSize: 14,
        }}
        placeholder={t('meals.ingredients')}
        // onChangeText={ingredients => setIngredients(ingredients)}
        // defaultValue={ingredients}
      />
      <SelectDropdown
        defaultButtonText={t('meals.complexity.name')}
        buttonTextStyle={{
          textAlign: 'left',
          color: complex ? colors.text : 'grey',
          fontSize: 14,
        }}
        buttonStyle={{
          height: 50,
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 15,
          width: '100%',
        }}
        dropdownOverlayColor="transparent"
        rowTextStyle={{color: colors.text, textAlign: 'left', fontSize: 14}}
        selectedRowTextStyle={{color: colors.primary}}
        dropdownStyle={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 15,
          height: 'auto',
        }}
        renderDropdownIcon={() => (
          <Icon name="chevron-down-outline" color={colors.text} />
        )}
        dropdownIconPosition="right"
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

      <View style={{alignItems: 'center'}}>
        <Icon.Button
          style={{paddingVertical: 15, paddingHorizontal: 25}}
          name="add-outline"
          borderRadius={25}
          backgroundColor={colors.primary}
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
        </Icon.Button>
      </View>
    </View>
  );
}
