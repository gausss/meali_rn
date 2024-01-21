import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ingredient, Meal } from '../../domain/Meal';
import { MealsContext, MealsDispatchContext } from '../../context/MealContext';
import { Button } from '../../shared/Button';
import { Card } from '../../shared/Card';
import { Input } from '../../shared/Input';
import { Label } from '../../shared/Label';
import { ListItemSeparator } from '../../shared/List';
import { Select } from '../../shared/Select';
import { GlobalStyles } from '../../shared/Styles';
import { MealScreenParams } from './MealScreenParams';

export function MealDetail(): React.JSX.Element {
  const { t } = useTranslation();
  const { dark, colors } = useTheme();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Detail'>>();
  const dispatch = useContext(MealsDispatchContext);
  const meals = useContext(MealsContext);
  const editIndex = route.params.index;

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          maxHeight: 300,
        },
        ingredientRemove: {
          backgroundColor: dark ? '#444444' : '#cccccc',
          borderRadius: 25,
        },
        ingredientAdd: {
          padding: 12,
          alignItems: 'center',
        },
      }),
    [dark],
  );

  const [localMeal, setLocalMeal] = useState<Partial<Meal>>(
    editIndex?.toString()
      ? Meal.copy(meals[editIndex.valueOf()])
      : { complexity: 'EASY' },
  );

  const addIngredient = (ingredient: Ingredient) => {
    setLocalMeal(meal => {
      meal.ingredients = [...(meal.ingredients || []), ingredient];
      return { ...meal };
    });
  };

  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        label={t('meals.name')}
        inputMode="text"
        onChangeText={value => {
          setLocalMeal(meal => ({ ...meal, name: value }));
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
          setLocalMeal(meal => ({ ...meal, complexity: selectedItem }));
        }}
        defaultValue={localMeal.complexity}
      />

      <Card>
        <View style={styles.ingredientCard}>
          <View
            style={{
              paddingEnd: 20,
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <Label text={t('meals.ingredient.title')} />
            <Text style={{ paddingStart: 10, paddingBottom: 5, color: 'grey' }}>
              {t('meals.ingredient.explanation')}
            </Text>
          </View>
          <ListItemSeparator />
          <TouchableHighlight
            underlayColor={colors.notification}
            hitSlop={3}
            style={styles.ingredientAdd}
            onPress={() => {
              navigation.navigate('Ingredient', {
                updateIngredient: addIngredient,
              });
            }}>
            <Icon
              name="add-outline"
              color={colors.text}
              size={GlobalStyles.defaultText.fontSize}
            />
          </TouchableHighlight>
          <View style={{ paddingBottom: localMeal.ingredients?.length ? 0 : 20 }}>
            <ListItemSeparator />
          </View>
          <FlatList
            style={styles.insetList}
            data={localMeal.ingredients}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item, index }) => (
              <View style={styles.ingredientRow}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...GlobalStyles.defaultText,
                    color: colors.text,
                    maxWidth: '90%',
                  }}>
                  {item.count ? item.count + ' ' : null}
                  <Text>{t(`meals.ingredient.unitType.${item.unit}`)}</Text>
                  <Text> {item.name}</Text>
                </Text>
                <TouchableHighlight
                  key={item.name}
                  hitSlop={3}
                  underlayColor={colors.notification}
                  style={styles.ingredientRemove}
                  onPress={() => {
                    setLocalMeal(meal => {
                      meal.ingredients?.splice(index, 1);
                      return { ...meal };
                    });
                  }}>
                  <Icon
                    name="close-outline"
                    color={dark ? 'black' : 'white'}
                    size={GlobalStyles.defaultText.fontSize}
                  />
                </TouchableHighlight>
              </View>
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
