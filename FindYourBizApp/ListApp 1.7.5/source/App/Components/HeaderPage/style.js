/** @format */

import { StyleSheet } from 'react-native'
import Color from '@common/Color'

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    minHeight: 40,
    backgroundColor: '#fff'
  },
  backIcon: {
    width: 26,
    height: 10,
    resizeMode: 'contain',
    margin: 6,
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 15,
  },
  largeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 70,
  },
  subTitle: {
    marginTop: 10,
    color: 'rgba(175,176,175,1)',
    fontSize: 12,
    marginBottom: 10,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  rightTitle: {
    fontSize: 16,
    color: Color.appColor,
  },
})
