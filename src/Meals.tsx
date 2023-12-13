import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Section } from "./Section";


export default function Meals(): React.JSX.Element {
    const { colors } = useTheme();

    return <View style={{ height: '100%' }}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View
                style={{
                    backgroundColor: colors.background,
                }}>
                <Section title="Step One">
                    Add your <Text style={styles.highlight}>favorite</Text> meals to the list.
                </Section>
                <View style={{
                    alignItems: 'center',
                    gap: 20
                }}>
                    <Image
                        source={{ uri: 'Ravioli' }}
                        style={{
                            width: 400,
                            height: 400,
                            resizeMode: 'contain',
                            tintColor: colors.text,
                        }}
                    />
                    <Icon.Button
                        style={{ paddingVertical: 15, paddingHorizontal: 25 }}
                        name="add-outline"
                        borderRadius={25}
                        backgroundColor={colors.primary}
                        onPress={() => console.log("Pressed")}
                    >
                        Add meal
                    </Icon.Button>
                </View>
            </View>
        </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
});