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
  wrap: {
    position: 'absolute',
    zIndex: 9999,
    top: 15,
    right: 4,
    width: width * 2 / 3,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 40,
    transform: [{ scaleX: Constants.RTL ? -1 : 1 }],
  },
  wrapListing: {
    right: 0,
    flexDirection: 'row',
    zIndex: 99,
    width: width * 2 / 3,
  },
  backBtn: {
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  row: {
    flexDirection: 'row',
  },
  imgLocation: {
    width: 17,
    height: 17,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textLocation: {
    color: "'rgb(255, 255, 255)'",
    backgroundColor: 'transparent',
    zIndex: 9999,
    fontSize: 13,
  },
  textListing: {
    color: "'rgb(146, 146, 175)'",
  },
})
