import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {DimensionValue, StyleSheet, View} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from './GlobalStyles';
import {Label} from './Label';

export type SelectProps = SelectDropdownProps & {
  width?: DimensionValue;
  label?: string;
};

export function Select(props: SelectProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View>
      <Label text={props.label} />
      <SelectDropdown
        {...props}
        buttonTextStyle={{
          ...styles.buttonTextStyle,
          color: colors.text,
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
        }}
      />
    </View>
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
