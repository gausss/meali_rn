import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Section } from "./Section";


export default function Plan(): React.JSX.Element {
    const { colors } = useTheme();

    return <View style={{ height: '100%' }}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View
                style={{
                    backgroundColor: colors.background,
                }}>
                <Section title="First step">
                    <Text>Generate a randomized plan of your <Text style={styles.highlight}>favorite</Text> meals. </Text>
                    <Text>You can <Text style={styles.highlight}>pin</Text> meals you like and randomize the rest until you are happy.</Text>
                </Section>
                <View style={{
                    alignItems: 'center',
                    gap: 20
                }}>
                    <Image
                        source={{ uri: 'Farfalle' }}
                        style={{
                            width: 400,
                            height: 400,
                            resizeMode: 'contain',
                            tintColor: colors.text,
                        }}
                    />
                    <Icon.Button
                        style={{ paddingVertical: 15, paddingHorizontal: 25 }}
                        name="reload-outline"
                        borderRadius={25}
                        backgroundColor={colors.primary}
                        onPress={() => console.log("Pressed")}
                    >
                        Generate
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