import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Section} from '../../shared/Section';
import {ActionButton} from '../../shared/ActionButton';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  console.log('Render PlanList');

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
        <ActionButton
          name="reload-outline"
          onPress={() => console.log('Pressed')}>
          {t('plan.generate')}
        </ActionButton>
      </View>
    </View>
  );
}
