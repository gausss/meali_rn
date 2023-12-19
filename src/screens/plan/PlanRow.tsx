import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {useTheme} from '@react-navigation/native';
import {Meal} from '../../domain/Meal';
import {useTranslation} from 'react-i18next';
import {Badge} from '../../shared/Badge';

interface PlanRowProps {
  item: Meal;
  index: number;
}

export function PlanRow({item, index}: PlanRowProps): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          ...styles.indexCircle,
          borderColor: colors.notification,
          backgroundColor: colors.notification,
        }}>
        <Text style={{...styles.indexText, color: colors.text}}>
          {index + 1}
        </Text>
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: GlobalStyles.defaultText.fontSize,
            color: colors.text,
          }}>
          {item.name}
        </Text>
        {item.complexity === 'HARD' ? (
          <Badge text={t(`meals.complexity.${item.complexity}`)} />
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
    paddingVertical: 15,
  },
  indexCircle: {
    borderWidth: 3,
    borderRadius: 40,
    width: 50,
    height: 50,
    paddingLeft: 12,
    paddingTop: 3,
  },
  indexText: {
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
