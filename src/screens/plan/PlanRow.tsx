import {useTheme} from '@react-navigation/native';
import {format} from 'date-fns';
import {de} from 'date-fns/locale';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../domain/Plan';
import {GlobalStyles} from '../../shared/Styles';
import {useContext} from 'react';
import {OptionsContext} from '../../domain/OptionsContext';
const {add} = require('date-fns');

interface PlanRowProps {
  suggestion: Suggestion;
  generated: Date;
}

export function PlanRow({
  suggestion,
  generated,
}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();
  const options = useContext(OptionsContext);

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
            name="lock-open-outline"
            style={{
              ...styles.iconStyle,
              color: colors.text,
            }}
          />
        ) : (
          <Icon
            name="lock-closed"
            style={{
              ...styles.iconStyle,
              color: colors.text,
            }}
          />
        )}
      </View>
      <View>
        <View style={styles.content}>
          {options.showWeekdays ? (
            <Text style={{...styles.suggestionDay}}>
              {format(
                add(generated, {
                  days: suggestion.index + options.startDay || 0,
                }),
                'EEEE',
                {
                  locale: de,
                },
              )}
            </Text>
          ) : null}
          <View style={GlobalStyles.row}>
            <Text
              numberOfLines={1}
              style={{...styles.suggestionMeal, color: colors.text}}>
              {suggestion.meal.name}
            </Text>
            {suggestion.meal.complexity === 'HARD' ? (
              <View style={GlobalStyles.badgeWarn} />
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
