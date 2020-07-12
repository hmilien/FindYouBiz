/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Device, Constants, Styles } from '@common'

const { width, height } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  flatlist: {
    marginTop: 35,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    flex: 1,
  },

  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
    marginBottom: 30,
  },
  box: {
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    backgroundColor: 'transparent',
    width: width,
    height: (height * 90) / 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  boxName: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  boxNameText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    fontWeight: '600',
    fontFamily: Constants.fontFamilyBold,
    backgroundColor: 'transparent',
  },
  boxCountText: {
    color: '#fff',
    fontFamily: Constants.fontFamilyBold,
    fontWeight: '400',
    fontSize: 13,
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  boxCategory: {
    height: width / 4,
    width: width / 2 - 10,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  viewBox: {
    backgroundColor: '#2AB5B3',
    borderRadius: 9,
    overflow: 'hidden',
  },
  imageBox: {
    borderRadius: 6,
    resizeMode: 'cover',
  },
  image: {
    width: width - 30,
    alignItems: 'center',
    marginLeft: 15,
    height: 150,
    marginBottom: 30,
    borderRadius: 6,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    fontFamily: Constants.fontFamilyBold,
  },
  containerStyle: {
    shadowColor: '#000',
    backgroundColor: 'transparent',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  count: {
    fontSize: 15,
    color: '#fff',
    marginTop: 4,
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamily,
  },
  wrapListCate: {
    paddingTop: 50,
  },
  toolbarIcon: {
    marginTop: 18,
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  fab: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 15,
    right: 12,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, .85)',

    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  horizontalLoading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  //new style
  containerStyle: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
    margin: 15,
  },

  borderView: {
    flex: 1,
    width: width - 30,
    height: height / 5 - 10,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    width: width - 30,
    height: height / 5 - 10,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  dim_layout: {
    width: width - 30,
    height: height / 5 - 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  mainCategoryText: {
    color: 'white',
    fontSize: 25,
  },
})
