/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Color, Config, Constants } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentList: {
    width,
    paddingTop: Constants.Window.bannerHeight,
    paddingBottom: 50,
  },
  content: {
    width: width - 20
  },
  viewContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 20,
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    margin: 10,
    zIndex: 9999,
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }, 
  authorWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
    width: width - 20,
  },
  mainView: {
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255,1)',
    flex: 1, 
    paddingBottom: 10,
    paddingTop: 10,
    width, 
  }
})
