import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    de: {
        translation: {
            plan: {
                "tabTitle": "Plan",
                "headerTitle": "Essensplan",
                "introHeading": "Essensplan erstellen",
                "introDescription": "Erstelle einen Essensplan für die nächsten tage. Pinne deine Favoriten und erstelle den Rest neu bis du zufrieden bist.",
                "generate": "Erstellen"
            },
            meals: {
                "tabTitle": "Gerichte",
                "introHeading": "Gerichte hinzufügen",
                "introDescription": "Füge deine Lieblingsgerichte und Zutaten hinzu, um sie in zukünftigen Essensplänen zu sehen.",
                "add": "Gericht hinzufügen",
                "save": "Speichern",
                "name": "Name",
                "ingredients": "Zutaten"
            }
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'de',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;