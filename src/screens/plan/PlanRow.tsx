import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../domain/Plan';
import {Badge} from '../../shared/Badge';

interface PlanRowProps {
  suggestion: Suggestion;
}

export function PlanRow({suggestion}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  console.log('Render PlanRow ' + suggestion.index);
  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          ...styles.indexCircle,
          borderColor: colors.notification,
          backgroundColor: suggestion.pinned ? 'green' : colors.notification,
        }}>
        <Icon
          name={suggestion.pinned ? '' : 'add-outline'}
          style={{
            ...styles.iconStyle,
            color: colors.text,
          }}
        />
      </View>
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            width: '90%',
          }}>
          {suggestion.meal.name}
        </Text>
        {suggestion.meal.complexity === 'HARD' ? <Badge /> : null}
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
    width: 30,
    height: 30,
    paddingLeft: 3.5,
    paddingTop: 3,
  },
  iconStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
});
