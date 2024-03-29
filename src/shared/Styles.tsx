import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  viewCentered: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 15
  },
  fab: {
    zIndex: 1,
    position: 'absolute',
    bottom: 100,
    right: 10
  },
  viewContainer: {
    marginTop: 15,
    flex: 1
  },
  card: {
    borderRadius: 12,
    marginBottom: 10
  },
  placeholderBuyListImage: {
    height: Dimensions.get('window').height * 0.25,
    marginVertical: 35,
    resizeMode: 'contain'
  },
  placeholderImagePlan: {
    height: Dimensions.get('window').height * 0.4,
    marginVertical: 35,
    resizeMode: 'contain'
  },
  placeholderImageMeal: {
    height: Dimensions.get('window').height * 0.25,
    marginVertical: 35,
    resizeMode: 'contain'
  },
  defaultText: {
    fontSize: 16
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionBody: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  badgeWarn: {
    backgroundColor: '#FEC514',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  badgeInfo: {
    backgroundColor: '#5e9d5e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  statusBarTitle: {
    fontSize: 26,
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  rowApart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'space-between',
    width: '100%'
  },
  headeIcon: {
    marginRight: 0
  },
  inputStyle: {
    paddingEnd: 20,
    height: 50,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  defaultBorder: {
    borderRadius: 12
  }
});

export const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: '#E0DEE7',
    primary: '#5e9d5e'
  }
};

export const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    notification: '#444',
    card: '#181818',
    primary: '#5e9d5e'
  }
};
