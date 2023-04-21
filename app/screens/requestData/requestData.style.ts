import {Dimensions, StyleSheet} from 'react-native';

export const requestDataScreenStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  header: {
    top: 10,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 31,
    height: 31,
    borderRadius: 31 / 2,
    left: -80,
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    backArrow: {
      width: 'auto',
      height: 'auto',
    },
  },
  componentContainer: {
    left: 16,
    top: 64,
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  component: {
    // paddingHorizontal: 50,
    // paddingVertical: 6,
    alignSelf: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',

    boxSizing: 'border-box',
    position: 'relative',
    width: 163.5,
    height: 150,
    // left: 16,
    // top: -1000,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderRadius: 16,
    icon: {
      position: 'absolute',
      top: 50,
      width: 'auto',
      height: 'auto',
    },
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
  buttonText: {
    position: 'absolute',
    top: 110,
    width: 'auto',
    height: 'auto',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
  },
});
