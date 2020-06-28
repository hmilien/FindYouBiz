import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  headerView: {
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: width,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 45,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: Constants.fontFamilyBold,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 6,
    marginLeft: 12,
  },
  headerIcons: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    opacity: 0.4,
  },
})
