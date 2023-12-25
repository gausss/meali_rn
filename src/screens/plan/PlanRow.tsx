import {useTheme} from '@react-navigation/native';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../domain/Plan';
import {GlobalStyles} from '../../shared/Styles';
const {add} = require('date-fns');

interface PlanRowProps {
  suggestion: Suggestion;
}

export function PlanRow({suggestion}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();
  const today = new Date();

  console.log('Render PlanRow ' + suggestion.index);
  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          ...styles.indexCircle,
          borderColor: colors.notification,
          backgroundColor: colors.notification,
        }}>
        {!suggestion.pinned ? (
          <Icon
            name="add-outline"
            style={{
              ...styles.iconStyle,
              color: colors.text,
            }}
          />
        ) : (
          <Icon
            name="checkmark-sharp"
            style={{
              ...styles.iconStyle,
              color: colors.text,
            }}
          />
        )}
      </View>
      <View>
        <View style={styles.content}>
          <Text style={{...styles.suggestionDay}}>
            {format(add(today, {days: suggestion.index}), 'EEEE', {locale: de})}
          </Text>
          <View style={GlobalStyles.row}>
            <Text
              numberOfLines={1}
              style={{...styles.suggestionMeal, color: colors.text}}>
              {suggestion.meal.name}
            </Text>
            {suggestion.meal.complexity === 'HARD' ? (
              <View style={GlobalStyles.badge} />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 13.5,
  },
  indexCircle: {
    borderWidth: 3,
    borderRadius: 15,
    width: 25,
    height: 25,
    paddingLeft: 0.5,
    paddingTop: 0.5,
  },
  iconStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  suggestionMeal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  suggestionDay: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'grey',
  },
  content: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
