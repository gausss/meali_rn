import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    de: {
        translation: {
            plan: {
                "tabTitle": "Plan",
                "headerTitle": "Essensplan",
                "introHeading": "Plan erstellen",
                "introDescription": "Erstelle einen Essensplan für die nächsten tage. Pinne deine Favoriten bis du zufrieden bist.",
                "generate": "Plan erstellen"
            },
            meals: {
                "tabTitle": "Gerichte",
                "introHeading": "Gerichte hinzufügen",
                "introDescription": "Füge deine Lieblingsgerichte und Zutaten hinzu, um sie in zukünftigen Essensplänen zu sehen.",
                "add": "Gericht hinzufügen",
                "create": "Neues Gericht",
                "edit": "Gericht bearbeiten",
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