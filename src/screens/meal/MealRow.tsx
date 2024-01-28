import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../shared/Styles';
import {Meal} from '../../domain/Meal';
import Icon from 'react-native-vector-icons/Ionicons';

interface MealRowProps {
  meal: Meal;
}

export function MealRow({meal}: MealRowProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={{...styles.rowTitle, color: colors.text}}>
        {meal.name}
      </Text>
      <Icon
        style={{...GlobalStyles.defaultText, color: colors.text}}
        name="chevron-forward-outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  rowTitle: {
    fontSize: GlobalStyles.defaultText.fontSize,
    width: '90%'
  }
});
