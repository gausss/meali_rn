import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Ingredient, Meal} from '../../domain/Meal';
import {MealsContext, MealsDispatchContext} from '../../domain/MealContext';
import {Button} from '../../shared/Button';
import {Card} from '../../shared/Card';
import {Input} from '../../shared/Input';
import {Label} from '../../shared/Label';
import {Select} from '../../shared/Select';
import {GlobalStyles} from '../../shared/Styles';
import {MealScreenParams} from './MealScreenParams';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {ListItemSeparator} from '../../shared/List';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function MealDetail(): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Detail'>>();
  const dispatch = useContext(MealsDispatchContext);
  const meals = useContext(MealsContext);
  const editIndex = route.params.index;

  const [localMeal, setLocalMeal] = useState<Partial<Meal>>(
    editIndex?.toString()
      ? Meal.copy(meals[editIndex.valueOf()])
      : {complexity: 'EASY'},
  );

  const addIngredient = (ingredient: Ingredient) => {
    setLocalMeal(meal => {
      meal.ingredients = [...(meal.ingredients || []), ingredient];
      return {...meal};
    });
  };

  console.log('Render MealEdit');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        label={t('meals.name')}
        autoFocus={true}
        onChangeText={value => {
          setLocalMeal(meal => ({...meal, name: value}));
        }}
        defaultValue={localMeal.name}
      />
      <Select
        label={t('meals.complexity.name')}
        data={['EASY', 'HARD']}
        rowTextForSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        onSelect={selectedItem => {
          setLocalMeal(meal => ({...meal, complexity: selectedItem}));
        }}
        defaultValue={localMeal.complexity}
      />

      <Card>
        <View style={styles.ingredientCard}>
          <View style={GlobalStyles.inputStyle}>
            <Label text={t('meals.ingredient.title')} />
            <Button
              label={t('meals.add')}
              backgroundColor={colors.card}
              textColor={colors.primary}
              onPress={() =>
                navigation.navigate('Ingredient', {
                  updateIngredient: addIngredient,
                })
              }
            />
          </View>
          <FlatList
            style={styles.insetList}
            data={localMeal.ingredients}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item, index}) => (
              <TouchableHighlight
                key={item.name}
                underlayColor={colors.notification}
                onPress={() => {
                  setLocalMeal(meal => {
                    meal.ingredients?.splice(index, 1);
                    return {...meal};
                  });
                }}>
                <View style={styles.ingredientRow}>
                  <Text
                    style={{...GlobalStyles.defaultText, color: colors.text}}>
                    {item.count}
                    <Text> {t(`meals.ingredient.unitType.${item.unit}`)}</Text>
                    <Text> {item.name}</Text>
                  </Text>
                  <Icon
                    name="trash"
                    color={'red'}
                    size={GlobalStyles.defaultText.fontSize}
                  />
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </Card>

      <View style={GlobalStyles.viewCentered}>
        <Button
          label={t('save')}
          disabled={!localMeal.name || !localMeal.complexity}
          onPress={() => {
            if (editIndex?.toString()) {
              dispatch({
                type: 'edit',
                meal: localMeal as Meal,
                index: editIndex.valueOf(),
              });
            } else {
              dispatch({
                type: 'add',
                meal: localMeal as Meal,
              });
            }
            navigation.navigate('List');
          }}
        />
        {editIndex?.toString() ? (
          <Button
            label={t('delete')}
            textColor="red"
            backgroundColor={colors.background}
            onPress={() => {
              dispatch({
                type: 'delete',
                index: editIndex.valueOf(),
              });
              navigation.navigate('List');
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientRow: {
    height: 50,
    padding: 10,
    paddingRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  insetList: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  ingredientCard: {
    maxHeight: 280,
  },
});
