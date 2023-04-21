import {Dimensions, StyleSheet} from 'react-native';

export const utilsStyle = StyleSheet.create({
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
  headerTextFrame: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
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
});
