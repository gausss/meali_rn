import {useTheme} from '@react-navigation/native';
import React from 'react';
import {DimensionValue, StyleSheet, View} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import {Label} from './Label';
import {GlobalStyles} from './Styles';
import {Card} from './Card';

export type SelectProps = SelectDropdownProps & {
  width?: DimensionValue;
  label?: string;
};

export function Select(props: SelectProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Card>
      <View style={GlobalStyles.inputStyle}>
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
          }}
          defaultButtonText=" "
          dropdownOverlayColor="transparent"
          statusBarTranslucent={true}
          rowTextStyle={{...styles.rowTextStyle, color: colors.text}}
          dropdownStyle={{
            ...styles.dropdownStyle,
            backgroundColor: colors.notification,
          }}
          renderDropdownIcon={() => (
            <Icon name="chevron-down-outline" color={colors.text} />
          )}
          dropdownIconPosition="right"
          onSelect={(selectedItem, index) => {
            props.onSelect(selectedItem, index);
          }}
        />
      </View>
    </Card>
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
    width: '55%',
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
    overlayColor: 'transparent',
    fontSize: GlobalStyles.defaultText.fontSize,
  },
});
