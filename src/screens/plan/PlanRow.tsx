import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../domain/Plan';
import {GlobalStyles} from '../../shared/GlobalStyles';

interface PlanRowProps {
  suggestion: Suggestion;
}

export function PlanRow({suggestion}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();

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
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={{...styles.itemTitle, color: colors.text}}>
          {suggestion.meal.name}
        </Text>
        {suggestion.meal.complexity === 'HARD' ? (
          <View style={GlobalStyles.badge} />
        ) : null}
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
    paddingVertical: 13.5,
  },
  indexCircle: {
    borderWidth: 3,
    borderRadius: 15,
    width: 25,
    height: 25,
    paddingLeft: 1,
    paddingTop: 1,
  },
  iconStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '90%',
  },
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
});
