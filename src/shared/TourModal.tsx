import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TooltipProps} from 'rn-tourguide';
import {Button} from './Button';

export const TourModal = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels
}: TooltipProps) => (
  <View
    style={{
      borderRadius: 16,
      paddingTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 16,
      width: '100%',
      backgroundColor: 'white'
    }}>
    <View style={styles.tooltipContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>
        {currentStep && currentStep.text}
      </Text>
    </View>
    <View style={[styles.bottomBar]}>
      {!isFirstStep ? (
        <TouchableOpacity onPress={handlePrev}>
          <Button
            backgroundColor="transparent"
            textColor="grey"
            icon="arrow-back-outline"></Button>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={handleStop}>
        <Button
          backgroundColor="transparent"
          textColor="grey"
          label={labels?.skip}></Button>
      </TouchableOpacity>

      {!isLastStep ? (
        <TouchableOpacity onPress={handleNext}>
          <Button
            backgroundColor="transparent"
            textColor="grey"
            icon="arrow-forward-outline"></Button>
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

const Z_INDEX: number = 100;
const MARGIN: number = 13;
const OFFSET_WIDTH: number = 4;

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 15,
    overflow: 'hidden',
    width: '100%',
    borderRadius: 16,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    zIndex: Z_INDEX - 1
  },
  tooltipText: {
    textAlign: 'left',
    color: 'grey'
  },
  tooltipContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%'
  },
  button: {
    padding: 10
  },
  buttonText: {
    color: '#27ae60'
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  overlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
});
