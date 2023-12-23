import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import {GlobalStyles} from './Styles';

type LabelProps = {
  text?: string;
};

export function Label(props: LabelProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Text style={{...styles.labelStyle, color: colors.text}}>{props.text}</Text>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: GlobalStyles.defaultText.fontSize,
    fontWeight: 'bold',
    margin: 10,
  },
});
