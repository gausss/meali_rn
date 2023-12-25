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
    marginTop: 5,
    justifyContent: 'space-between',
    gap: 20,
    maxHeight: '95%',
  },
  placeholderImagePlan: {
    height: Dimensions.get('window').height * 0.4,
    marginVertical: 35,
    resizeMode: 'contain',
  },
  placeholderImageMeal: {
    height: Dimensions.get('window').height * 0.3,
    marginVertical: 35,
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
    backgroundColor: '#ff9149',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 15,
  },
  statusBarTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  listStyle: {
    borderRadius: 12,
  },
  headeRow: {
    flexDirection: 'row',
    gap: 5,
  },
  headeIcon: {
    marginRight: 0,
  },
});

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: '#E0DEE7',
    primary: '#5e9d5e',
  },
};

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    notification: '#212123',
    primary: '#5e9d5e',
  },
};
