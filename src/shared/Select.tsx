import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {DimensionValue, StyleSheet} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from './GlobalStyles';

export type SelectProps = SelectDropdownProps & {
  width?: DimensionValue;
};

export function Select(props: SelectProps): React.JSX.Element {
  const {colors} = useTheme();
  const [selected, setSelected] = useState(false);

  return (
    <SelectDropdown
      {...props}
      buttonTextStyle={{
        ...styles.buttonTextStyle,
        color: props.defaultValue || selected ? colors.text : 'grey',
      }}
      buttonStyle={{
        ...styles.buttonStyle,
        backgroundColor: colors.card,
        width: props.width || '100%',
      }}
      dropdownOverlayColor="transparent"
      rowTextStyle={{...styles.rowTextStyle, color: colors.text}}
      selectedRowTextStyle={{color: colors.primary}}
      dropdownStyle={{...styles.dropdownStyle, backgroundColor: colors.card}}
      renderDropdownIcon={() => (
        <Icon name="chevron-down-outline" color={colors.text} />
      )}
      dropdownIconPosition="right"
      onSelect={(selectedItem, index) => {
        props.onSelect(selectedItem, index);
        setSelected(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    textAlign: 'left',
    fontSize: GlobalStyles.defaultText.fontSize,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 12,
    padding: 15,
    width: '100%',
    fontSize: GlobalStyles.defaultText.fontSize,
  },
  rowTextStyle: {
    textAlign: 'left',
    fontSize: GlobalStyles.defaultText.fontSize,
  },
  dropdownStyle: {
    borderRadius: 12,
    padding: 15,
    height: 'auto',
    fontSize: GlobalStyles.defaultText.fontSize,
  },
});
