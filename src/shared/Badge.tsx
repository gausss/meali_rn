import {StyleSheet, Text, View} from 'react-native';

interface BadgeProps {
  text: string;
}

export function Badge({text}: BadgeProps): React.JSX.Element {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: '#FEC514',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});
