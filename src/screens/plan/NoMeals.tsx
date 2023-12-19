import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {View, Text, Image, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../shared/GlobalStyles';

export function NoMealsPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: GlobalStyles.defaultText.fontSize,
          color: colors.text,
        }}>
        {t('plan.noMeals')}
      </Text>
      <Image
        source={require('../../img/arrow-down.png')}
        style={{
          ...styles.arrow,
          tintColor: colors.primary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: '20%',
  },
  arrow: {
    marginTop: 5,
    marginLeft: -10,
    height: 60,
    width: 60,
    resizeMode: 'contain',
    transform: [{rotate: '270deg'}],
  },
});
