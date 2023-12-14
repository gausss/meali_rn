import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Section } from "./Section";

export interface Meal {
    name: string,
    ingredients: string
}

export default function Meals(): React.JSX.Element {
    const { colors } = useTheme();

    const Stack = createNativeStackNavigator();

    return <Stack.Navigator>
        <Stack.Screen
            name="List"
            component={MealList}
        />
        <Stack.Screen name="Add"
            component={MealAdd}
        />
    </Stack.Navigator>
};

function MealList({ route, navigation }): React.JSX.Element {
    const { colors } = useTheme();

    React.useEffect(() => {
        if (route.params?.newMeal) {
            setMeals([...meals, route.params.newMeal]);
            route.params.newMeal = undefined;
            console.log(meals);
        }
    }, [route.params?.newMeal]);

    const [meals, setMeals] = useState<Meal[]>([]);

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
                <View>
                    {meals.map((value, key) => { return <Text key={key} style={{ color: colors.text }}>{value.name}</Text> })}
                </View>
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
                        onPress={() => navigation.navigate('Add')}
                    >
                        Add meal
                    </Icon.Button>
                </View>
            </View>
        </ScrollView>
    </View>;
}
function MealAdd({ navigation }): React.JSX.Element {
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');

    return <ScrollView>
        <View style={{ height: '100%', padding: 15, gap: 20 }}>
            <TextInput
                style={{ height: 50, color: colors.text, backgroundColor: colors.card, borderRadius: 12, padding: 15, fontSize: 14 }}
                placeholder="Name"
                onChangeText={name => setName(name)}
                defaultValue={name}
            />
            <TextInput
                style={{ height: 50, color: colors.text, backgroundColor: colors.card, borderRadius: 12, padding: 15, fontSize: 14 }}
                placeholder="Ingredients"
                onChangeText={ingredients => setIngredients(ingredients)}
                defaultValue={ingredients}
            />
            <View style={{ alignItems: 'center' }}>
                <Icon.Button
                    style={{ paddingVertical: 15, paddingHorizontal: 25 }}
                    name="add-outline"
                    borderRadius={25}
                    backgroundColor={colors.primary}
                    onPress={() => navigation.navigate({
                        name: 'List',
                        params: { newMeal: { name, ingredients } },
                        merge: true,
                    })}
                >
                    Save
                </Icon.Button>
            </View>
        </View>
    </ScrollView >
}


const styles = StyleSheet.create({
    highlight: {
        fontWeight: '700',
    },
});