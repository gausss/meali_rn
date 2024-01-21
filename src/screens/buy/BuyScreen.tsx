import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Share, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BuyContext } from '../../context/BuyContext';
import { GlobalStyles } from '../../shared/Styles';
import { BuyList } from './BuyList';
import { BuyScreenParams } from './BuyScreenParams';

export default function BuyScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const Stack = createNativeStackNavigator<BuyScreenParams>();
  const { colors } = useTheme();
  const buyItems = useContext(BuyContext);

  const onShare = async () => {
    await Share.share({
      message: 'Einkaufsliste \n - ' + buyItems.filter((item) => !item.checked).map((item) => item.value).join("\n - ")
    });
  };

  const buyActions = () => {
    return (
      <View style={GlobalStyles.row}>
        {buyItems.length ? (
          <View style={GlobalStyles.row}>
            <Icon.Button
              backgroundColor={'transparent'}
              underlayColor={'transparent'}
              iconStyle={GlobalStyles.headeIcon}
              color={colors.text}
              size={22}
              name="share-outline"
              onPress={async () => onShare()}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const buyTitle = () => (
    <Text
      style={{
        ...GlobalStyles.statusBarTitle,
        color: colors.text
      }}>
      {t('buy.title')}
    </Text>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={BuyList}
        options={{
          title: '',
          headerTitleStyle: { fontSize: 22 },
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerRight: buyActions,
          headerLeft: buyTitle
        }}
      />
    </Stack.Navigator>
  );
}
