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
      paddingVertical: 15,
      paddingHorizontal: 25,
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
      paddingLeft: 2,
      paddingTop: 1,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderRadius: 30
    },
    textStyle: {
      fontSize: GlobalStyles.defaultText.fontSize,
      fontWeight: '600',
      color: props.textColor || 'white'
    },
    iconStyle: {
      fontSize: 25,
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
