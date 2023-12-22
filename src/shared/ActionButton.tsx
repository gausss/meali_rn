import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from './GlobalStyles';

export function ActionButton(props: IconButtonProps): React.JSX.Element {
  const {colors} = useTheme();

  const backgroundColor = () => {
    if (props.disabled) {
      return 'grey';
    } else if (props.backgroundColor) {
      return props.backgroundColor;
    } else {
      return colors.primary;
    }
  };

  return (
    <Icon.Button
      {...props}
      borderRadius={25}
      iconStyle={{
        fontSize: 20,
        marginLeft: props.name.length > 0 ? 0 : -10,
      }}
      style={styles.buttonStyle}
      backgroundColor={backgroundColor()}>
      {props.children}
    </Icon.Button>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: GlobalStyles.defaultText.fontSize,
  },
});
