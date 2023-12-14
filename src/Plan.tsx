import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Section } from "./Section";

export default function PlanTab(): React.JSX.Element {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const Stack = createNativeStackNavigator();

    return <Stack.Navigator>
        <Stack.Screen
            name="List"
            component={PlanList}
            options={{ title: t('plan.headerTitle'), }}
        />
    </Stack.Navigator>
};

export function PlanList(): React.JSX.Element {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return <View style={{ height: '100%' }}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View
                style={{
                    backgroundColor: colors.background,
                }}>
                <Section title={t('plan.introHeading')}>
                    <Text>{t('plan.introDescription')} </Text>
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
                        {t('plan.generate')}
                    </Icon.Button>
                </View>
            </View>
        </ScrollView>
    </View>;
};