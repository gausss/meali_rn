import {StyleSheet, View} from 'react-native';

export function Badge(): React.JSX.Element {
  return <View style={styles.badgeContainer} />;
}

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});
