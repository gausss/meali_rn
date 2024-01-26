import {Switch, SwitchProps, View} from 'react-native';
import {Label} from './Label';
import {GlobalStyles} from './Styles';
import {useTheme} from '@react-navigation/native';

type ToggleProps = SwitchProps & {
  label?: string;
};

export function Toggle(props: ToggleProps): React.JSX.Element {
  const {colors} = useTheme();
  return (
    <View style={{...GlobalStyles.inputStyle, backgroundColor: colors.card}}>
      <Label text={props.label} />
      <Switch {...props} />
    </View>
  );
}
