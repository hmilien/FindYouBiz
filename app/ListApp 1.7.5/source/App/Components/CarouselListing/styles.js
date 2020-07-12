/** @format */

import { Constants } from '@common'
import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

function wp(percentage) {
  const value = percentage * viewportWidth / 100
  return Math.round(value)
}

const slideHeight = viewportHeight * 0.15
export const sliderWidth = viewportWidth
export const itemHorizontalMargin = 15
export const itemWidth = viewportWidth / 3
const entryBorderRadius = 5

export default StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 9999,
  },
  sliderContainer: {
    borderRadius: entryBorderRadius,
  },

  slideInnerContainer: {
    width: sliderWidth,
    height: slideHeight,
  },

  imageContainer: {
    height: viewportHeight * 0.2,
    margin: itemHorizontalMargin,

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    borderRadius: entryBorderRadius,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    borderRadius: entryBorderRadius,
  },
  wrapText: {
    position: 'absolute',
    left: 8,
    bottom: 0,
    zIndex: 999,
    width: viewportWidth * 0.9,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, .9)',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    elevation: 10,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -12 },
  },
  title: {
    color: '#000',
    marginTop: 3,
    fontSize: 12,
    letterSpacing: 1.5,
    lineHeight: 14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamilyBold,
  },
  address: {
    color: '#000',
    marginBottom: 4,
    fontSize: 10,
    letterSpacing: 1.2,
    lineHeight: 13,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamilyLight,
  },
  item: {
    backgroundColor: 'transparent',
  },
  linear: {
    zIndex: 999,
    width: viewportWidth,
    bottom: 0,
    height: viewportHeight / 5,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 5,
  },
  noResult: {
    color: '#000',
    marginTop: 3,
    fontSize: 14,
    letterSpacing: 1.3,
    lineHeight: 14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamilyBold,
  },
})
