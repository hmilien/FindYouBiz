/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants, Styles } from '@common'
const { width, height, scale } = Dimensions.get('window')

export default StyleSheet.create({
  panel: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    position: 'relative',
    width: width / 3 - 10,
    height: width / 3 + 20,
    borderRadius: 3,
  },

  time: {
    alignSelf: Constants.RTL ? 'flex-end' : 'flex-start',
    marginLeft: 8,
    marginRight: 8,
    color: '#999',
    fontSize: 10,
    marginTop: 4,
    fontFamily: Constants.fontFamilyBold,
    textAlign: Constants.RTL ? 'right' : 'left',
  },
  heart: {
    position: 'absolute',
    zIndex: 9999,
    top: 1,
    right: 0,
  },

  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    marginTop: 22,
    marginRight: 18,
    marginBottom: 18,
    marginLeft: 22,
    zIndex: 9999,
    width: 24,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 60,
    left: width / 2 - 30,
    zIndex: 999,
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    borderRadius: 40,
  },

  //rating
  fixHeart: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  name: {
    fontSize: 14,
    width: width / 3 - 10,
    marginRight: 8,
    marginTop: 6,
    marginLeft: 4,
    marginBottom: 0,
    fontFamily: Constants.fontFamily,
    textAlign: Constants.RTL ? 'right' : 'left',
  },
  nameSub: {
    color: '#333',
    fontSize: 11,
    marginLeft: 8,
    alignSelf: 'flex-start',
    width: width / 3 - 10,
    fontFamily: Constants.fontFamilyLight,
  },
  wrapRating: {
    flex: 1,
    marginTop: 10,
    marginLeft: 6,
    alignSelf: 'flex-start',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 4,
  },
  countText: {
    fontSize: 11,
    marginLeft: 8,
    fontFamily: Constants.fontFamily,
    color: '#666',
  },
  //distance
  wrapDisc: {
    flexDirection: 'row',
  },
  distance: {
    fontSize: 8,
    color: '#333',
    fontWeight: '300',
  },

  //price
  wrapPrice: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    padding: 5,
    borderTopRightRadius: 5,
  },
  price: {
    color: '#FFF',
    fontSize: 12,
  },

  //rating
  ratingView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 999,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .75)',
    padding: 3,
  },
  countText: {
    fontSize: 11,
    marginLeft: 8,
    fontFamily: Constants.fontFamily,
    color: '#666',
  },
})
