import {useTheme} from '@react-navigation/native';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

type InputProps = TextInputProps & {
  width?: DimensionValue;
};

export function Input(props: InputProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <TextInput
      {...props}
      inputMode="text"
      clearButtonMode="always"
      placeholderTextColor="grey"
      style={{
        ...styles.textInputStyle,
        color: colors.text,
        backgroundColor: colors.card,
        width: props.width,
      }}
    />
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    height: 50,
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
  },
});
