import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  viewCentered: {
    alignItems: 'center',
  },
  viewContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 20,
  },
  placeholderImage: {
    height: 380,
    resizeMode: 'contain',
  },
  defaultText: {
    fontSize: 14,
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
