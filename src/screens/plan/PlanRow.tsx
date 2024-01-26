import {
  NavigationProp,
  useNavigation,
  useTheme
} from '@react-navigation/native';
import {add, format} from 'date-fns';
import {de} from 'date-fns/locale';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {OptionsContext} from '../../context/OptionsContext';
import {Suggestion} from '../../domain/Plan';
import {Button} from '../../shared/Button';
import {GlobalStyles} from '../../shared/Styles';
import {PlanScreenParams} from './PlanScreenParams';

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
  const navigation = useNavigation<NavigationProp<PlanScreenParams>>();

  return (
    <View style={styles.content}>
      <View style={{...GlobalStyles.rowApart, justifyContent: 'space-between'}}>
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
        ) : (
          <Text style={{...styles.suggestionDay, paddingLeft: 12}}>
            {suggestion.index + 1}
          </Text>
        )}
        <View>
          <Button
            label="Gericht anzeigen"
            small={true}
            backgroundColor={colors.notification}
            textColor={colors.text}
            onPress={() =>
              navigation.navigate({
                name: 'Meal',
                params: {
                  meal: suggestion.meal
                }
              })
            }></Button>
        </View>
      </View>
      <View
        style={{
          ...GlobalStyles.rowApart,
          justifyContent: 'flex-start'
        }}>
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
        <Text
          numberOfLines={2}
          style={{
            ...styles.suggestionMeal,
            color: colors.text,
            maxWidth: '85%'
          }}>
          {suggestion.meal.name}
        </Text>
      </View>
      <View style={{...GlobalStyles.rowApart, justifyContent: 'center'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  suggestionDay: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'grey'
  },
  content: {
    flex: 1,
    padding: 14,
    gap: 8
  }
});
