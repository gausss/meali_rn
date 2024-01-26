import {useTheme} from '@react-navigation/native';
import {
  DimensionValue,
  StyleSheet,
  Text,
  TextInputProps,
  View
} from 'react-native';
import {Label} from './Label';
import {GlobalStyles} from './Styles';
import {TextProps} from 'react-native';

type ValueProps = TextProps & {
  width?: DimensionValue;
  label: string;
  value?: string;
};

export function Value(props: ValueProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View
      style={{
        borderRadius: 12,
        marginBottom: 10,
        paddingVertical: 8,
        backgroundColor: colors.card
      }}>
      <Label text={props.label} />
      <Text
        numberOfLines={5}
        style={{
          color: colors.text,
          padding: 10,
          fontSize: GlobalStyles.defaultText.fontSize
        }}>
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    padding: 20,
    height: 50,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: GlobalStyles.defaultText.fontSize
  }
});
