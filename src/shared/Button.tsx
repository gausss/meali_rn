import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {
  TouchableHighlight,
  TouchableHighlightProps,
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

  return (
    <TouchableHighlight
      {...props}
      underlayColor={colors.notification}
      style={styles.highlightStyle}>
      <View
        style={{
          ...styles.buttonStyle,
          backgroundColor: props.disabled
            ? 'grey'
            : props.backgroundColor || colors.primary,
          width: props.label ? 'auto' : 55,
          height: props.label ? 'auto' : 55,
          paddingHorizontal: props.label ? 25 : 0,
        }}>
        {props.icon ? (
          <Icon
            color={props.textColor || 'white'}
            style={{...styles.textStyle, fontSize: 22}}
            name={props.icon}
          />
        ) : null}
        {props.label ? (
          <Text
            style={{
              ...styles.textStyle,
              color: props.textColor || 'white',
            }}>
            {props.label}
          </Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  highlightStyle: {
    borderRadius: 30,
  },
  buttonStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30,
  },
  textStyle: {
    fontSize: GlobalStyles.defaultText.fontSize,
    fontWeight: '600',
  },
});
