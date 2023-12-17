import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {MainButton} from '../../shared/MainButton';
import {Section} from '../../shared/Section';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={{
        backgroundColor: colors.background,
      }}>
      <Section title={t('plan.introHeading')}>
        <Text>{t('plan.introDescription')} </Text>
      </Section>
      <View style={styles.viewStyleCenter}>
        <Image
          source={require('../../img/Farfalle.png')}
          style={{...styles.mainImage, tintColor: colors.text}}
        />
        <MainButton
          name="reload-outline"
          onPress={() => console.log('Pressed')}>
          {t('plan.generate')}
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyleCenter: {
    alignItems: 'center',
  },
  mainImage: {
    height: 380,
    resizeMode: 'contain',
  },
});
