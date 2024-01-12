import i18n from 'i18next';
import 'intl-pluralrules';
import {initReactI18next} from 'react-i18next';

const resources = {
  de: {
    translation: {
      save: 'Speichern',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      buy: {
        tabTitle: 'Einkauf',
        title: 'Einkaufsliste',
        introDescription:
          'Pinne Gerichte in deinem Plan, um alle benötigten Zutaten hier zu sehen.'
      },
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
          showWeekdays: 'Tage anzeigen',
          startDay: 'Tage starten'
        },
        days: {
          0: 'am Erstelldatum',
          1: 'am Tag danach'
        }
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
          explanation: 'Optional. Wird für die Einkaufsliste verwendet.',
          name: 'Zutat',
          count: 'Anzahl',
          unit: 'Einheit',
          unitType: {
            GRM: 'Gramm',
            ML: 'Milliliter',
            UNIT: 'Stück',
            CAN: 'Dose',
            PACK: 'Packung'
          }
        },
        complexity: {
          name: 'Schwierigkeit',
          EASY: 'Einfach',
          HARD: 'Aufwändig'
        }
      },
      guide: {
        next: 'Weiter',
        back: 'Zurück',
        skip: 'Abbrechen',
        finish: 'Fertig',
        meal: 'Ein Essensvorschlag für den gezeigten Tag. In den Optionen kann die Anzahl der Vorschläge/Tage angepasst werden.',
        pin: 'Pinne einen Vorschlag durch einmal antippen. Das Schloss Icon zeigt ob ein Vorschlag gepinnt ist oder nicht.',
        generate:
          'Generiere neue Vorschläge für deinen Plan. Gepinnte Vorschläge bleiben erhalten.',
        buy: 'Zeige eine Einkaufsliste aller Gerichte die gepinnt sind.',
        reset:
          'Setze deinen Plan zurück, z.B. wenn der geplante Zeitraum vorbei ist.'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
