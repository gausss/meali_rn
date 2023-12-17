import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

export function Select(props: SelectDropdownProps): React.JSX.Element {
  const {colors} = useTheme();
  const [selected, setSelected] = useState(false);

  return (
    <SelectDropdown
      {...props}
      buttonTextStyle={{
        ...styles.buttonTextStyle,
        color: selected ? colors.text : 'grey',
      }}
      buttonStyle={{...styles.buttonStyle, backgroundColor: colors.card}}
      dropdownOverlayColor="transparent"
      rowTextStyle={{...styles.rowTextStyle, color: colors.text}}
      selectedRowTextStyle={{color: colors.primary}}
      dropdownStyle={{...styles.dropdownStyle, backgroundColor: colors.card}}
      renderDropdownIcon={() => (
        <Icon name="chevron-down-outline" color={colors.text} />
      )}
      dropdownIconPosition="right"
      onSelect={() => setSelected(true)}
    />
  );
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    textAlign: 'left',
    fontSize: 14,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 12,
    padding: 15,
    width: '100%',
  },
  rowTextStyle: {
    textAlign: 'left',
    fontSize: 14,
  },
  dropdownStyle: {
    borderRadius: 12,
    padding: 15,
    height: 'auto',
  },
});
