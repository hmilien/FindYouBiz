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
    iconZoom: {
      position: 'absolute',
      right: 7,
      top: Device.isIphoneX ? 30 : 10,
      backgroundColor: 'transparent',
      paddingTop: 4,
      paddingRight: 4,
      paddingBottom: 4,
      paddingLeft: 4,
      marginRight: 10,
      zIndex: 9999,
    },
    closeRight: {
        right: 20,
    },
    textClose: {
        color: '#333',
        fontWeight: '600',
        fontSize: 20,
    },
    textCloseBooking: {
        fontSize: 18,
    },
    // close Comment
    textComment: {
        fontSize: 22,
    },
})