/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  flatlist: {
    flex: 1,
    width: width,
  },
  // empty
  body: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgEmpty: {
    resizeMode: 'contain',
  },
  title: {
    color: '#242134',
    fontSize: 24,
    fontFamily: Constants.fontFamilyLight,
    marginBottom: 30,
    marginTop: 30,
  },
  desc: {
    color: '#6D6D6D',
    fontSize: 14,
    fontFamily: Constants.fontFamilyLight,
    textAlign: 'center',
  },

  backBox: {
    backgroundColor: '#00C8FE',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Constants.fontFamilyLight,
  },
})
