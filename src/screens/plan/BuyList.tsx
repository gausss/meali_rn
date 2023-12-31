import {useTheme} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Image, Text, View} from 'react-native';
import {Ingredient} from '../../domain/Meal';
import {PlanContext} from '../../domain/PlanContext';
import {ListItemSeparator} from '../../shared/List';
import {GlobalStyles} from '../../shared/Styles';

export function BuyList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const plan = useContext(PlanContext);

  // const shareList = async (share: string) => {
  //   await Share.share({
  //     message: share,
  //   });
  // };

  const groups = [
    ...plan.suggestions
      .filter(suggestion => suggestion.pinned)
      .flatMap(suggestion => suggestion.meal.ingredients)
      .reduce((acc, curr) => {
        if (curr?.name) {
          const key = curr.name.trim();
          acc.set(key, [...(acc.get(key) || []), curr]);
        }

        return acc;
      }, new Map<String, Ingredient[]>())
      .values(),
  ].map(
    ingredients =>
      `${ingredients.reduce((acc, item) => acc + item.count, 0)} ${
        ingredients[0].unit
          ? t('meals.ingredient.unitType.' + ingredients[0].unit)
          : 'x'
      } ${ingredients[0].name}`,
  );

  return (
    <View
      style={{
        ...GlobalStyles.viewContainer,
      }}>
      {plan.suggestions.some(item => item.pinned) ? (
        <View>
          <FlatList
            style={GlobalStyles.listStyle}
            data={groups}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({item}) => (
              <View style={GlobalStyles.inputStyle}>
                <Text
                  selectable
                  style={{...GlobalStyles.defaultText, color: colors.text}}>
                  {item}
                </Text>
              </View>
            )}
          />
          {/* <View style={GlobalStyles.viewCentered}>
            <Button
              icon="share-outline"
              backgroundColor={colors.background}
              onPress={() => shareList(groups.join('\n'))}
            />
          </View> */}
        </View>
      ) : (
        <NoPlan />
      )}
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <Text style={{...GlobalStyles.sectionBody, color: colors.text}}>
        {t('buy.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/buylist.png')}
          style={{...GlobalStyles.placeholderBuyListImage}}
        />
      </View>
    </View>
  );
}
