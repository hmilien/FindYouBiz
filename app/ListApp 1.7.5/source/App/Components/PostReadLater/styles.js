import React, {
  StyleSheet,
  Platform,
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
  panel: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
  },
  title: {
    width: vw * 70,
    flex: 1,
  },
  image: {
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 30,
    height: vw * 30 - 20,
    borderRadius: 2,
  },
  name: {
    fontSize: 14,
    marginLeft: 8,
    marginTop: 12,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
  },
  time: {
    marginLeft: 8,
    marginRight: 8,
    color: '#999',
    fontSize: 11,
    marginBottom: 10,
    marginTop: 6,
    backgroundColor: 'transparent',
  },
})
