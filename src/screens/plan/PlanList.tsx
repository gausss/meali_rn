import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {MainButton} from '../../shared/MainButton';
import {Section} from '../../shared/Section';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={GlobalStyles.viewContainer}>
      <Section title={t('plan.introHeading')}>
        <Text>{t('plan.introDescription')} </Text>
      </Section>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/Farfalle.png')}
          style={{...GlobalStyles.placeholderImage, tintColor: colors.text}}
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
