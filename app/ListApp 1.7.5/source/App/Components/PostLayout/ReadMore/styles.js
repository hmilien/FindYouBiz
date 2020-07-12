import React, {
  Platform,
  StyleSheet,
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
  panelList: {
    backgroundColor: '#FFF',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
    marginLeft: 5,
  },
  fixHeart: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  imageList: {
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 30,
    height: vw * 30 - 20,
    // resizeMode: 'cover',
    borderRadius: 5,
  },
  titleList: {
    width: vw * 65,
  },
  nameList: {
    fontSize: 14,
    marginLeft: 4,
    marginTop: 12,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
  },
  descriptionList: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
    marginRight: 8,
    color: '#333',
    fontWeight: '300',
  },
  description: {
    backgroundColor: '#eee',
    flexDirection: 'row',
  },

  //rating

  wrapRating: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  countText: {
    fontSize: 11,
    marginLeft: 5,
    fontFamily: Constants.fontFamily,
  },
})
