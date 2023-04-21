import {StyleSheet} from 'react-native';

export const loginStyle = StyleSheet.create({
  mainContainer: {
    //padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  terraLogo: {
    position: 'relative',
    width: 138,
    height: 47,
    // left: 117.97,
    top: -25,
    fontFamily: 'Arvo',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 38.1875,
    lineHeight: 47,
    color: '#000000',
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
    // padding: 8.09668,
    gap: 8.1,

    position: 'relative',
    width: 293,
    height: 48,
    // left: 41,
    top: 4,

    backgroundColor: '#1E293A',
    borderRadius: 6.47734,
  },
  button2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 8.09668,
    gap: 8.1,

    position: 'relative',
    width: 293,
    height: 48,
    // left: 41,
    top: 14, //453,

    backgroundColor: '#60A5FA',
    borderRadius: 6.47734,
  },
  container: {
    flex: 1,
  },
  text: {
    fontWeight: '500',
    fontSize: 50,
  },
});
