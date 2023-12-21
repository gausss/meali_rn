import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  de: {
    translation: {
      save: 'Speichern',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      plan: {
        tabTitle: 'Plan',
        headerTitle: 'Essensplan',
        introHeading: 'Plan erstellen',
        introDescription:
          'Erstelle einen Essensplan für die nächsten Tage. Pinne deine Favoriten bis du zufrieden bist.',
        generate: 'Generieren',
        reset: 'Zurücksetzen',
        noMeals: 'Gerichte erfassen',
        options: {
          title: 'Einstellungen',
          numSuggestions: 'Anzahl Vorschläge',
        },
      },
      meals: {
        tabTitle: 'Gerichte',
        introHeading: 'Gerichte hinzufügen',
        introDescription:
          'Füge deine Lieblingsgerichte und Zutaten hinzu, um sie in zukünftigen Essensplänen zu sehen.',
        add: 'Gericht hinzufügen',
        create: 'Neues Gericht',
        edit: 'Gericht bearbeiten',
        name: 'Name',
        ingredient: {
          name: 'Zutat',
          count: 'Anzahl',
          unit: 'Einheit',
          unitType: {
            GRM: 'Gramm',
            ML: 'Milliliter',
            UNIT: 'Stück',
          },
        },
        complexity: {
          name: 'Schwierigkeit',
          EASY: 'Einfach',
          HARD: 'Aufwändig',
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'de',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
