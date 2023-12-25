import {useTheme} from '@react-navigation/native';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {GlobalStyles} from './Styles';
import {Label} from './Label';
import {Card} from './Card';

type InputProps = TextInputProps & {
  width?: DimensionValue;
  label?: string;
};

export function Input(props: InputProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Card>
      <View style={GlobalStyles.inputStyle}>
        <Label text={props.label} />
        <TextInput
          {...props}
          inputMode="text"
          clearButtonMode="always"
          selectionColor={colors.primary}
          style={{...styles.inputStyle, color: colors.text}}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: GlobalStyles.defaultText.fontSize,
    width: '50%',
  },
});
