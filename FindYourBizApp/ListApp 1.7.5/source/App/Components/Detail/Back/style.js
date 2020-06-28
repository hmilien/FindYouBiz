/** @format */

import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    margin: 10,
    zIndex: 9999,
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 9999,
    shadowColor: 'rgba(15, 15, 15, 0.7)',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  iconBlack: {
    backgroundColor: 'transparent',
    borderRadius: 13,
    position: 'absolute',
    top: 0,
    left: 0,
  }
})
