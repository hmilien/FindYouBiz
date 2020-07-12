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
  body: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  flatlist: {
    marginTop: 15,
    alignItems: 'flex-start',
    marginLeft: 13,
  },
  more: {
    width: width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
})
