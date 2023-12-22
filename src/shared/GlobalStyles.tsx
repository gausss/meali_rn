import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  viewCentered: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  viewContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 20,
    height: '82%',
  },
  placeholderImage: {
    height: Dimensions.get('window').height * 0.43,
    resizeMode: 'contain',
  },
  defaultText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionBody: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  badge: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
  },
});

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: '#E0DEE7',
  },
};

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    notification: '#212123',
  },
};
