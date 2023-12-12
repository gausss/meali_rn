import { Button, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Section } from "./Section";


export default function Home(navigation): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: Colors.darker,
    };

    return <View><StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
    />
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
                }}>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Plan')}
                />
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
                    Read the docs to discover more:
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