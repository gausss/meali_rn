import {Switch, SwitchProps, View} from 'react-native';
import {Card} from './Card';
import {Label} from './Label';
import {GlobalStyles} from './Styles';

type ToggleProps = SwitchProps & {
  label?: string;
};

export function Toggle(props: ToggleProps): React.JSX.Element {
  return (
    <Card>
      <View style={GlobalStyles.inputStyle}>
        <Label text={props.label} />
        <Switch {...props} />
      </View>
    </Card>
  );
}
