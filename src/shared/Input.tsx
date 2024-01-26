import {useTheme} from '@react-navigation/native';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import {GlobalStyles} from './Styles';
import {Label} from './Label';

type InputProps = TextInputProps & {
  width?: DimensionValue;
  label?: string;
};

export function Input(props: InputProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View style={{...GlobalStyles.inputStyle, backgroundColor: colors.card}}>
      <Label text={props.label} />
      <TextInput
        {...props}
        clearButtonMode="always"
        selectionColor={colors.primary}
        style={{...styles.inputStyle, color: colors.text}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: GlobalStyles.defaultText.fontSize,
    width: '50%'
  }
});
