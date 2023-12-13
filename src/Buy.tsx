import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Section } from "./Section";


export default function Buy(): React.JSX.Element {
    const { colors } = useTheme();

    return <View style={{ height: '100%' }}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View
                style={{
                    backgroundColor: colors.background,
                }}>
                <Section title="Step One">
                    Generate a <Text style={styles.highlight}>Plan</Text> to see your shopping list here.
                </Section>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Image
                        source={{ uri: 'Penne' }}
                        style={{
                            width: 400,
                            height: 400,
                            resizeMode: 'contain',
                            tintColor: colors.text,
                        }}
                    />
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