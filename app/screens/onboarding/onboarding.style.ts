import {StyleSheet} from 'react-native';

export const onboardingStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    // left: 37,
    top: -110,
  },
  // text container one
  textContainer: {
    position: 'relative',
    width: 261,
    height: 60,
    top: -60,
  },
  text: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold', // React Native uses string values for fontWeight
    fontSize: 20,
    // lineHeight: '130%', // Note: lineHeight in React Native does not take a unit value
    textAlign: 'center',
    color: '#000000',
  },
  // text container two
  textContainer2: {
    position: 'relative',
    width: 296,
    height: 21,
    top: -45,
  },
  text2: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '300', // React Native uses string values for fontWeight
    fontSize: 16,
    // lineHeight: '130%', // Note: lineHeight in React Native does not take a unit value
    textAlign: 'center',
    color: '#000000',
  },
  // switching bar
  switchingBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    gap: 4,
    position: 'relative',
    width: 44,
    height: 12,
    // left: 165,
    top: 40,
  },
  circle2: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#D9D9D9',
  },
  circle1: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#1E293A',
  },
  appButtonText: {
    width: 'auto',
    height: 17,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    color: '#FFFFFF',
    flex: 0, // equivalent to "flex: none"
    flexGrow: 0, // equivalent to "flex-grow: 0"
  },
  button1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
    width: 169.22,
    height: 33.19,
    // left: 103,
    top: 100,
    backgroundColor: '#1E293A',
    borderRadius: 6.47734,
  },
});
