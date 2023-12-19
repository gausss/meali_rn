import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from './GlobalStyles';

export function ActionButton(props: IconButtonProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Icon.Button
      {...props}
      borderRadius={25}
      style={styles.buttonStyle}
      backgroundColor={props.disabled ? 'grey' : colors.primary}>
      {props.children}
    </Icon.Button>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: GlobalStyles.defaultText.fontSize,
  },
});
