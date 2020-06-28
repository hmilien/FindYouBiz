/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Color, Device, Config, Constants } from '@common'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
    height: 40,
    justifyContent: 'center',
  },
  search: {
    position: 'absolute',
    right: 10,
    top: 25,
    zIndex: 99999,
  },
  iconSearch: {
    resizeMode: 'contain',
    width: 18,
  },
})
