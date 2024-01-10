import {useTheme} from '@react-navigation/native';
import {DimensionValue, StyleSheet, View} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  maxHeight?: DimensionValue | undefined;
}

export function Card({children, maxHeight}: CardProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: colors.card,
        maxHeight,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 'auto',
    borderRadius: 12,
    marginBottom: 10,
  },
});
