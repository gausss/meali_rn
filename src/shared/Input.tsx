import {useTheme} from '@react-navigation/native';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export function Input(props: TextInputProps): React.JSX.Element {
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
