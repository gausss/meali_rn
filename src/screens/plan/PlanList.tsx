import {
  NavigationProp,
  useNavigation,
  useTheme
} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableHighlight
} from 'react-native-gesture-handler';
import {useTourGuideController} from 'rn-tourguide';
import {HomeTabParams} from '../../App';
import {MealsContext} from '../../context/MealContext';
import {OptionsContext} from '../../context/OptionsContext';
import {PlanContext, PlanDispatchContext} from '../../context/PlanContext';
import {Button} from '../../shared/Button';
import {GlobalStyles} from '../../shared/Styles';
import {PlanRow} from './PlanRow';

export function PlanList(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const meals = useContext(MealsContext);
  const plan = useContext(PlanContext);
  const options = useContext(OptionsContext);
  const planDispatch = useContext(PlanDispatchContext);
  const {TourGuideZone} = useTourGuideController('plan');

  return (
    <View style={GlobalStyles.viewContainer}>
      {plan.generated ? (
        <View style={GlobalStyles.fab}>
          <TourGuideZone zone={3} text={t('guide.generate')} shape="circle">
            <Button
              icon="reload"
              textColor="white"
              disabled={
                !meals.length ||
                (plan.generated &&
                  plan.suggestions.filter(suggestion => suggestion.pinned)
                    .length === options.numSuggestions)
              }
              onPress={() => {
                planDispatch({
                  type: 'generateMore',
                  meals: meals,
                  options: options
                });
              }}
            />
          </TourGuideZone>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{marginHorizontal: 15}}>
        {meals.length && plan.generated && options.numSuggestions ? (
          <View>
            {plan.suggestions.map((item, index) =>
              index === 0 ? (
                <TourGuideZone zone={1} text={t('guide.meal')}>
                  <View
                    style={{
                      ...GlobalStyles.card,
                      backgroundColor: colors.card
                    }}>
                    <TouchableHighlight
                      key={item.index}
                      style={{borderRadius: 12}}
                      underlayColor={colors.notification}
                      onPress={() => {
                        planDispatch({type: 'togglePin', index});
                      }}>
                      <PlanRow generated={plan.generated} suggestion={item} />
                    </TouchableHighlight>
                  </View>
                </TourGuideZone>
              ) : (
                <View
                  style={{...GlobalStyles.card, backgroundColor: colors.card}}>
                  <TouchableHighlight
                    key={item.index}
                    style={{borderRadius: 12}}
                    underlayColor={colors.notification}
                    onPress={() => {
                      planDispatch({type: 'togglePin', index});
                    }}>
                    <PlanRow generated={plan.generated} suggestion={item} />
                  </TouchableHighlight>
                </View>
              )
            )}
          </View>
        ) : (
          <NoPlan />
        )}

        <View style={GlobalStyles.actionBar}>
          {!meals.length || !plan.generated ? (
            <Button
              label={t('plan.generate')}
              disabled={!meals.length}
              onPress={() => {
                planDispatch({
                  type: 'init',
                  meals: meals,
                  options: options
                });
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

function NoPlan(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<HomeTabParams>>();
  const meals = useContext(MealsContext);

  return (
    <View>
      <Text style={{...GlobalStyles.sectionBody, color: colors.text}}>
        {t('plan.introDescription')}
      </Text>
      <View style={GlobalStyles.viewCentered}>
        <Image
          source={require('../../img/plan-fly.png')}
          style={{...GlobalStyles.placeholderImagePlan}}
        />
      </View>
      {!meals.length ? (
        <View style={GlobalStyles.viewCentered}>
          <Text
            style={{...GlobalStyles.sectionBody, color: colors.primary}}
            onPress={() => navigation.navigate('MealTab')}>
            {t('plan.noMeals')}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
