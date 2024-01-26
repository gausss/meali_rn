import {useTheme} from '@react-navigation/native';
import {add, format} from 'date-fns';
import {de} from 'date-fns/locale';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OptionsContext} from '../../context/OptionsContext';
import {Suggestion} from '../../domain/Plan';
import {GlobalStyles} from '../../shared/Styles';

interface PlanRowProps {
  suggestion: Suggestion;
  generated: Date;
}

export function PlanRow({
  suggestion,
  generated
}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();
  const options = useContext(OptionsContext);

  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          ...styles.indexCircle,
          borderColor: colors.notification,
          backgroundColor: colors.notification
        }}>
        {!suggestion.pinned ? (
          <Icon
            name="lock-open-outline"
            style={{
              ...styles.iconStyle,
              color: colors.text
            }}
          />
        ) : (
          <Icon
            name="lock-closed"
            style={{
              ...styles.iconStyle,
              color: colors.text
            }}
          />
        )}
      </View>
      <View style={styles.content}>
        <View style={GlobalStyles.rowApart}>
          {options.showWeekdays ? (
            <Text style={{...styles.suggestionDay}}>
              {format(
                add(generated, {
                  days: suggestion.index + options.startDay || 0
                }),
                'EEEE',
                {
                  locale: de
                }
              )}
            </Text>
          ) : null}
          {options.showReference ? (
            <Text style={{...styles.suggestionDay}}>
              {suggestion.meal.reference}
            </Text>
          ) : null}
        </View>
        <View style={GlobalStyles.row}>
          <Text
            numberOfLines={2}
            style={{
              ...styles.suggestionMeal,
              color: colors.text
            }}>
            {suggestion.meal.name}
          </Text>
          {suggestion.meal.complexity === 'HARD' ? (
            <View style={GlobalStyles.badgeWarn} />
          ) : null}
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
    maxWidth: '78%'
  },
  indexCircle: {
    borderWidth: 3,
    borderRadius: 35,
    width: 35,
    height: 35,
    paddingLeft: 5,
    paddingTop: 5
  },
  iconStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  suggestionMeal: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  suggestionDay: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'grey'
  },
  content: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});
