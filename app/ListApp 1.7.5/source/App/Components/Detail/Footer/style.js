/** @format */
import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Constants, Color } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  //bottom Buttons
  bottomView: {
    height: 50,
    width,
    zIndex: 999,
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: -1 },
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonAction: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 10,
    ...Platform.select({
      android: {
        paddingVertical: 12,
      },
    }),
  },
  imageButton: {
    width: 19,
    height: 19,
    tintColor: '#000',
  },

  buttonStyle: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    ...Platform.select({
      android: {
        height: 50,
      },
    }),
  },
  buttonWhatApps: {
    position: 'absolute',
    bottom: 30,
    right: 5,
    zIndex: 999,
  },
  imageButtonWhatApps: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 30,
    right: 5,
    zIndex: 999,
  },
  comment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    position: 'absolute',
    right: 3,
    backgroundColor: Color.countComment,
    borderRadius: 50,
    padding: 2,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        zIndex: 9999,
        top: 5,
      },
      ios: {
        top: -9,
      },
    }),
  },
  topRightText: {
    color: '#FFF',
    fontSize: 10,
  },
  rightBooking: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: Color.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBooking: {
    backgroundColor: 'transparent',
    width: 24,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#FFF',
    marginRight: 5,
  },
  textBooking: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: Constants.fontFamilyLight,
  },
  withChat: {
    paddingLeft: 10,
  },
})
