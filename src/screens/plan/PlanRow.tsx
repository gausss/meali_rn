import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Suggestion} from '../../domain/Plan';
import {Badge} from '../../shared/Badge';
import {GlobalStyles} from '../../shared/GlobalStyles';

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
          backgroundColor: colors.notification,
        }}>
        <Icon
          name={suggestion.pinned ? 'checkmark-outline' : 'add-outline'}
          style={{...styles.iconStyle, color: colors.text}}
        />
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: GlobalStyles.defaultText.fontSize,
            color: colors.text,
          }}>
          {suggestion.meal.name}
        </Text>
        {suggestion.meal.complexity === 'HARD' ? (
          <Badge text={t(`meals.complexity.${suggestion.meal.complexity}`)} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 13.5,
  },
  indexCircle: {
    borderWidth: 3,
    borderRadius: 40,
    width: 50,
    height: 50,
    paddingLeft: 6,
    paddingTop: 6,
  },
  iconStyle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});
