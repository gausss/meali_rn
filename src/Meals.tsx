import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { Section } from "./Section";

export interface Meal {
    name: string,
    ingredients: Ingredient[],
    complex?: Complexity
}

type Complexity = 'EASY' | 'HARD';

export interface Ingredient {
    name: string,
    count: number,
    type: Unit
}
type Unit = 'GRM' | 'ML' | 'UNIT';

type MealStackParams = {
    List: { newMeal: Meal };
    Add: undefined;
};


type ListProps = NativeStackScreenProps<MealStackParams, 'List'>;
type AddProps = NativeStackScreenProps<MealStackParams, 'Add'>;

export default function MealTab(): React.JSX.Element {
    const { t } = useTranslation();

    const Stack = createNativeStackNavigator<MealStackParams>();

    return <Stack.Navigator>
        <Stack.Screen
            name="List"
            component={MealList}
            options={{ title: t('meals.tabTitle'), }}
        />
        <Stack.Screen
            name="Add"
            component={MealAdd}
            options={{
                title: t('meals.create'),
            }}
        />
    </Stack.Navigator>
};

function MealList({ route, navigation }: ListProps): React.JSX.Element {
    const { colors } = useTheme();
    const { t } = useTranslation();

    React.useEffect(() => {
        if (route.params?.newMeal) {
            setMeals([...meals, route.params.newMeal]);
            navigation.setParams({ newMeal: undefined })
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
                <Section title={t('meals.introHeading')}>
                    <Text>{t('meals.introDescription')}</Text>
                </Section>
                <View>
                    {meals.map((value, key) => { return <Text key={key} style={{ color: colors.text }}>{value.name}</Text> })}
                </View>
                <View style={{
                    alignItems: 'center',
                    gap: 20
                }}>
                    <Image
                        source={require('./img/Ravioli.png')}
                        style={{
                            height: 380,
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
                        {t('meals.add')}
                    </Icon.Button>
                </View>
            </View>
        </ScrollView>
    </View>;
}
function MealAdd({ navigation }: AddProps): React.JSX.Element {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [complex, setComplex] = useState<Complexity>();

    return <ScrollView>
        <View style={{ height: '100%', padding: 15, gap: 20 }}>
            <TextInput inputMode='text' clearButtonMode='always'
                placeholderTextColor='grey'
                style={{ height: 50, color: colors.text, backgroundColor: colors.card, borderRadius: 12, padding: 15, fontSize: 14 }}
                placeholder={t('meals.name')}
                onChangeText={name => setName(name)}
                defaultValue={name}
            />
            <TextInput inputMode='text' clearButtonMode='always'
                placeholderTextColor='grey'
                style={{ height: 50, color: colors.text, backgroundColor: colors.card, borderRadius: 12, padding: 15, fontSize: 14 }}
                placeholder={t('meals.ingredients')}
            // onChangeText={ingredients => setIngredients(ingredients)}
            // defaultValue={ingredients}
            />
            <SelectDropdown
                defaultButtonText={t('meals.complexity.name')}
                buttonTextStyle={{ textAlign: 'left', color: complex ? colors.text : 'grey', fontSize: 14 }}
                buttonStyle={{ height: 50, backgroundColor: colors.card, borderRadius: 12, padding: 15, width: '100%' }}
                dropdownOverlayColor='transparent'
                rowTextStyle={{ color: colors.text, textAlign: 'left', fontSize: 14 }}
                selectedRowTextStyle={{ color: colors.primary }}
                dropdownStyle={{ backgroundColor: colors.card, borderRadius: 12, padding: 15, height:'auto' }}
                renderDropdownIcon={() => <Icon name="chevron-down-outline"></Icon>}
                dropdownIconPosition='right'
                data={['EASY', 'HARD']}
                rowTextForSelection={(item) => {
                    return t(`meals.complexity.${item}`)
                }}
                buttonTextAfterSelection={(item) => {
                    return t(`meals.complexity.${item}`)
                }}
                onSelect={(selectedItem) => {
                    setComplex(selectedItem);
                }}
            />

            <View style={{ alignItems: 'center' }}>
                <Icon.Button
                    style={{ paddingVertical: 15, paddingHorizontal: 25 }}
                    name="add-outline"
                    borderRadius={25}
                    backgroundColor={colors.primary}
                    onPress={() => navigation.navigate({
                        name: 'List',
                        params: { newMeal: { name: name, ingredients: [], complex: complex } },
                        merge: true,
                    })}
                >
                    {t('meals.save')}
                </Icon.Button>
            </View>
        </View>
    </ScrollView >
}