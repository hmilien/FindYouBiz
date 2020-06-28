/** @format */

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
  panelOne: {
    flex: 1,
    width: width,
    marginBottom: 15,
  },
  imagePanelOne: {
    marginTop: 6,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 8,
    width: width - 24,
    height: width / 2,
  },
  nameOne: {
    fontSize: 22,
    width: width - 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    textAlign: Constants.RTL ? 'right' : 'left',
    fontFamily: Constants.fontFamilyBold,
  },
  timeOne: {
    marginBottom: 10,
    marginTop: 4,
    marginLeft: 12,
    marginRight: 12,
    color: '#999',
    fontSize: 12,
    textAlign: Constants.RTL ? 'right' : 'left',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  floatTitle: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    width: width - 30,
    backgroundColor: 'transparent',
    color: '#fff',
  },

  linearGradient: {
    height: 120,
    marginTop: -120,
    width: width - 24,
    marginLeft: 12,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },

  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
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
    top: width / 5 - 10,
    left: width / 2 - 30,
    zIndex: 999,
    width: 60,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    height: 60,
    borderRadius: 40,
  },

  //Trend
  panelTrend: {
    width,
    alignItems: 'center',
  },
  cardTrendGradient: {
    width: width - 30,
    height: height / 3,
    borderRadius: 8,
    flex: 1,
    zIndex: 9999,
    position: 'absolute',
    left: 15,
    top: 0,
  },
  imagePanelTrend: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 8,
    flex: 1,
    width: width - 30,
    height: height / 3,
  },
  blurOne: {
    marginLeft: 20,
  },

  nameTrend: {
    fontSize: 16,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    color: '#000',
    fontWeight: '600',
    fontFamily: Constants.fontFamily,
  },
  nameLocation: {
    fontSize: 12,
    color: '#000',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 10,
  },
  cardTrendBottom: {
    flexDirection: 'row',
    position: 'absolute',
    left: 30,
    bottom: 20,
    alignSelf: 'flex-start',
    zIndex: 9999,
  },
  readMore: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 25,
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamily,
  },
  iconReadMore: {
    marginTop: 18,
    marginLeft: 5,
  },
  cate: {
    marginTop: 5,
  },
  //price range
  wrapPriceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: 25,
    backgroundColor: 'rgba(0, 0, 0, .75)',
    padding: 5,
    borderTopRightRadius: 5,
  },
  priceRange: {
    fontSize: 12,
    fontFamily: Constants.fontFamilyBold,
    marginLeft: 5,
    color: '#FFF',
  },

  //icon
  iconFeature: {
    marginRight: 7,
  },
  //rating
  ratingView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  countText: {
    fontSize: 11,
    marginLeft: 8,
    fontFamily: Constants.fontFamily,
    color: '#666',
  },

  oneRow: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },

  fixHeart: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
  },

  // card Vertical
  blurOneVertical: {
    position: 'absolute',
    left: 19,
    bottom: 20,
    width: width * 0.8,
    zIndex: 9999,
  },
  nameTrendVertical: {
    fontSize: 24,
  },
  priceVertical: {
    backgroundColor: 'transparent',
    marginLeft: 5,
    bottom: 10,
    zIndex: 999,
  },
  priceRangeVertical: {
    color: '#FFF',
    fontSize: 14,
  },
  verticalGradient: {
    width: width - 30,
    height: height * 0.4,
    borderRadius: 15,
    zIndex: 999,
    position: 'absolute',
    flex: 1,
    left: 18,
    bottom: 0,
  },
  imageCardVertical: {
    marginTop: 6,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 15,
    width: width - 30,
    height: height * 0.6,
  },
  nameTrendVertical: {
    fontSize: 36,
    color: '#FFF',
    marginLeft: 15,
    bottom: 40,
    zIndex: 999
  },
  ratingViewVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 15,
    bottom: 30,
    zIndex: 9999,
  },
  countTextVer: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 8,
    fontFamily: Constants.fontFamily,
  },
  addressLeft: {
    flexDirection: 'row',
    position: 'absolute',
    left: 30,
    top: 25,
    alignItems: 'center',
    zIndex: 999,
    width: width / 2 + 30,
  },
  locationText: {
    color: '#FFF',
    fontFamily: Constants.fontFamilyBold,
    fontSize: 14,
  },
  fixHeartVertical: {
    position: 'absolute',
    right: 15,
    top: 18,
    zIndex: 999,
  },
})
