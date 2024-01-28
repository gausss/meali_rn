import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {
  TouchableHighlight,
  TouchableHighlightProps
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyles} from './Styles';

type ButtonProps = TouchableHighlightProps & {
  label?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  small?: boolean;
};

export function Button(props: ButtonProps): React.JSX.Element {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    highlightStyle: {
      borderRadius: 30
    },
    buttonStyle: {
      backgroundColor: props.disabled
        ? 'grey'
        : props.backgroundColor || colors.primary,
      flexDirection: 'row',
      paddingVertical: props.small ? 10 : 15,
      paddingLeft: props.small ? 12 : 25,
      paddingRight: props.small ? 12 : 20,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderRadius: 30
    },
    buttonStyleIconOnly: {
      backgroundColor: props.disabled
        ? 'grey'
        : props.backgroundColor || colors.primary,
      flexDirection: 'row',
      paddingLeft: 1,
      paddingTop: 1,
      width: props.small ? 30 : 50,
      height: props.small ? 30 : 50,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderRadius: 30
    },
    textStyle: {
      fontSize: props.small ? 10 : GlobalStyles.defaultText.fontSize,
      fontWeight: '600',
      color: props.textColor || 'white'
    },
    iconStyle: {
      fontSize: props.small ? 20 : 25,
      fontWeight: '600'
    }
  });

  return (
    <TouchableHighlight
      {...props}
      underlayColor={colors.notification}
      style={styles.highlightStyle}>
      <View
        style={props.label ? styles.buttonStyle : styles.buttonStyleIconOnly}>
        {props.icon ? (
          <Icon
            color={props.textColor || colors.text}
            style={styles.iconStyle}
            name={props.icon}
          />
        ) : null}
        {props.label ? (
          <Text style={styles.textStyle}>{props.label}</Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );
}
