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
  wrap: {
    marginHorizontal: 15,
    marginTop: 40,
  },
  head: {
    flexDirection: 'row',
    width: width - 30,
    alignItems: 'center',
  },
  headLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textHeadLeft: {
    color: 'rgb(69,69,83)',
    fontSize: 24,
    fontFamily: Constants.fontFamilyLight,
  },
  textHeadRight: {
    color: 'rgb(157, 163, 180)',
    fontSize: 12,
    fontFamily: Constants.fontFamily,
  },
  review: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(205, 212, 232, 0.5)',
  },
  row: {
    flexDirection: 'row',
  },
  headReview: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    flexDirection: 'row',
  },
  imgAvatar: {
    resizeMode: 'contain',
    height: 35,
    width: 35,
    marginTop: 3,
  },
  boxAvatar: {
    justifyContent: 'flex-start',
  },
  desc: {
    marginLeft: 10,
  },
  wrapReview: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: Constants.fontFamily,
    fontSize: 14,
    color: 'rgb(69, 69, 83)',
  },
  time: {
    fontFamily: Constants.fontFamilyLight,
    fontSize: 11,
    color: 'rgb(188, 192, 200)',
  },
  desReview: {
    flex: 1,
    marginVertical: 4,
  },
  textDes: {
    fontFamily: Constants.fontFamilyLight,
    fontSize: 13,
    color: '#333',
    lineHeight: 16,
  },
  rating: {
    marginVertical: 5,
    marginLeft: -3,
  },

  //// review
  rowReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapIconReview: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Color.activeReview,
    padding: 5,
  },
  boxTextReview: {
    marginLeft: 10,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 12,
    fontFamily: Constants.fontFamilyLight,
  },
})
