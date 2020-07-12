/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Device, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontFamilyBold,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#758692',
    width: 230,
    marginTop: 10,
    lineHeight: 25,
  },
  labelView: {
    width: (90 * Constants.Window.width) / 100,
    backgroundColor: 'rgba(206, 215, 221, 1)',
    borderRadius: 10,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    alignItems: 'flex-start',
  },
  listView: {
    flex: 1,
  },
  flatlist: {
    paddingTop: Platform.OS == 'ios' ? 40 : 50,
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
