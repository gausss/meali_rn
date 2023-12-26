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
        headerTitle: 'Plan',
        introDescription:
          'Erstelle einen Plan aus den generierten Vorschlägen. Pinne deine Favoriten bis du zufrieden bist.',
        generate: 'Plan erstellen',
        more: 'Neue Vorschläge',
        reset: 'Zurücksetzen',
        noMeals: 'Erfasse zuerst deine Gerichte.',
        options: {
          title: 'Einstellungen',
          numSuggestions: 'Anzahl Vorschläge',
          showWeekdays: 'Wochentage anzeigen',
        },
      },
      meals: {
        tabTitle: 'Gerichte',
        headerTitle: 'Gerichte',
        introDescription:
          'Füge deine Lieblingsgerichte und Zutaten hinzu, um sie in zukünftigen Essensplänen zu sehen.',
        add: 'Hinzufügen',
        detail: 'Gericht',
        name: 'Name',
        ingredient: {
          title: 'Zutaten',
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
