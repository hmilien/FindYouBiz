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
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 45 / 100,
    position: 'relative',
    resizeMode: 'cover',
  },
  overlayVideo: {
    top: 0,
    left: 0,
    zIndex: 100,
    width: width,
    height: height * 45 / 100,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  iconPlay: {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'transparent',
    marginTop: 22,
    marginRight: 18,
    marginBottom: 18,
    marginLeft: 26,
    zIndex: 9999,
    width: 28,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: height * 15 / 100,
    left: width / 2 - 30,
    zIndex: 999,
    width: 60,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    height: 60,
    borderRadius: 40,
  },
  textIconVideo: {
    fontSize: 80,
  },
})
