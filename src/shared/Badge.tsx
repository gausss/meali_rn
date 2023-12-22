import {StyleSheet, View} from 'react-native';

export function Badge(): React.JSX.Element {
  return <View style={styles.badgeContainer}></View>;
}

const styles = StyleSheet.create({
  badgeContainer: {
    backgroundColor: '#FEC514',
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
