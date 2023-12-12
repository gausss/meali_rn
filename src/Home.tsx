import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Section } from "./Section";


export default function Home(navigation): React.JSX.Element {
    const { colors } = useTheme();

    return <View>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <Header />
            <View
                style={{
                    backgroundColor: colors.background,
                }}>
                <Section title="Step One">
                    Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                    screen and then come back to see your edits.
                </Section>
                <Section title="See Your Changes">
                    <ReloadInstructions />
                </Section>
                <Section title="Debug">
                    <DebugInstructions />
                </Section>
                <Section title="Learn More">
                    Read the docs to discover more -
                </Section>
                <LearnMoreLinks />
            </View>
        </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
});