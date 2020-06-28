/** @format */
import { StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  container: {
    width: '100%',
    height: Constants.Window.bannerHeight,
    backgroundColor: 'white',
  },
  fixedHeader: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fixedTitle: {
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 50,
    textAlign: 'center',
  },
})
