import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';

export function ListItemSeparator(): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.notification,
        height: 1,
      }}
    />
  );
}
