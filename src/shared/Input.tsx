import {useTheme} from '@react-navigation/native';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {GlobalStyles} from './GlobalStyles';
import {Label} from './Label';

type InputProps = TextInputProps & {
  width?: DimensionValue;
  label?: string;
};

export function Input(props: InputProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View>
      <Label text={props.label} />
      <TextInput
        {...props}
        inputMode="text"
        clearButtonMode="always"
        style={{
          ...styles.textInputStyle,
          color: colors.text,
          backgroundColor: colors.card,
          width: props.width,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    height: 50,
    borderRadius: 12,
    padding: 15,
    fontSize: GlobalStyles.defaultText.fontSize,
  },
});
