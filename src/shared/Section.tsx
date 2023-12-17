import {useTheme} from '@react-navigation/native';
import {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export function Section({children, title}: SectionProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: colors.text,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: colors.text,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});
