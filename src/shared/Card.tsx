import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

export function Card({children}: CardProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: colors.card,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 'auto',
    borderRadius: 12,
    paddingVertical: 15,
  },
});
