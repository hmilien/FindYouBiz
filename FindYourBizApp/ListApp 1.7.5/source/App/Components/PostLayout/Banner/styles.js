import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Colors, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  bannerView: {
    width: width,
    backgroundColor: '#fff',
    height: Constants.Window.bannerHeight,
    marginBottom: 20,
  },
  banner: {
    height: height / 3,
    width: width,
    backgroundColor: '#ccc',
  },

  bannerImage: {
    width: width,
    height: Constants.Window.bannerHeight,
  },

  bannerGradient: {
    width: width,
    height: Constants.Window.bannerHeight,
    alignItems: Constants.RTL ? 'flex-end' : 'flex-start',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 9999,
    position: 'absolute',
    left: 0,
    top: 0,
  },

  bannerWrapper: {},
  title: {},
})
