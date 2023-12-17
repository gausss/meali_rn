import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from '../../shared/Button';
import {Section} from '../../shared/Section';

export default function PlanTab(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={PlanList}
        options={{title: t('plan.headerTitle')}}
      />
    </Stack.Navigator>
  );
}

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
        <Button name="reload-outline" onPress={() => console.log('Pressed')}>
          {t('plan.generate')}
        </Button>
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
