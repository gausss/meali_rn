import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';
import {useTheme} from '@react-navigation/native';

export function IngredientList(): React.JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 15,
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'dashed',
        paddingVertical: 10,
        borderColor: colors.border,
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
        }}>
        <Input
          width="28%"
          inputMode={'numeric'}
          placeholder={t('meals.ingredient.count')}
        />
        <Select
          width={'60%'}
          defaultButtonText={t('meals.ingredient.unit')}
          data={['GRM', 'ML', 'UNIT']}
          rowTextForSelection={item => {
            return t(`meals.ingredient.unitType.${item}`);
          }}
          buttonTextAfterSelection={item => {
            return t(`meals.ingredient.unitType.${item}`);
          }}
          onSelect={selectedItem => {
            console.log(selectedItem);
          }}
        />
      </View>
      <Input width="91%" placeholder={t('meals.ingredient.name')} />
      <Icon
        style={{fontSize: 25, color: colors.primary}}
        name="add-circle-outline"
        onPress={() => {
          console.log();
        }}
      />
    </View>
  );
}
