/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants, Device } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: Platform.OS == 'ios' ? 'absolute' : 'relative',
    top: Device.isIphoneX ? 70 : 50,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  activeTab: {
    height: 3,
    backgroundColor: Color.background,
  },
  textTab: {
    fontWeight: '600',
    fontSize: 35,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  toolbar: {
    left: 14,
    alignSelf: 'flex-start',
  },
})
