import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ListItemSeparator } from '../../shared/List';
import { GlobalStyles } from '../../shared/Styles';
import { useContext } from 'react';
import { BuyContext, BuyDispatchContext } from '../../context/BuyContext';

export function BuyList(): React.JSX.Element {
  const { colors } = useTheme();
  const buyItems = useContext(BuyContext);
  const buyItemsDispatch = useContext(BuyDispatchContext);

  return (
    <View
      style={{
        ...GlobalStyles.viewContainer
      }}>
      {buyItems.length ? (
        <View>
          <FlatList
            style={GlobalStyles.listStyle}
            data={buyItems}
            scrollEnabled={true}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item, index }) => (
              <BouncyCheckbox style={{ height: 50, paddingEnd: 20 }}
                disableBuiltInState={true}
                isChecked={item.checked}
                textStyle={{ color: colors.text, overflow: 'hidden' }}
                onPress={() => { buyItemsDispatch({ type: 'update', index: index }) }}
                fillColor={colors.primary}
                unfillColor="transparent" text={item.value} />
            )}
          />
        </View>
      ) : (
        <NoPlan />
      )}
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View>
      <Text style={{ ...GlobalStyles.sectionBody, color: colors.text }}>
        {t('buy.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/buylist.png')}
          style={{ ...GlobalStyles.placeholderBuyListImage }}
        />
      </View>
    </View>
  );
}
