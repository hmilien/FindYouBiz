/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Device, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: height / 2 - 65,
    width: width,
  },
  linearGradientMap: {
    top: 0,
    left: 0,
    width: width,
    height: Platform.OS == 'ios' ? height / 3 + 15 : height / 2 + 20,
    position: 'absolute',
    zIndex: 999,
  },
  seeMore: {
    position: 'absolute',
    top: 0,
    left: 15,
    zIndex: 999,
    backgroundColor: 'transparent',
    width: width,
  },
  rowHead: {
    flexDirection: 'row',
    width: width - 30,
    alignItems: 'center',
    marginTop: 10,
  },
  rowHeadLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rowHeadRight: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: -40,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, .9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textDesMore: {
    color: 'rgb(69,69,83)',
    fontSize: 24,
    fontFamily: Constants.fontFamilyLight,
  },
  iconDirections: {
    width: 20,
    height: 18,
    marginRight: 10,
  },
  viewMapFull: {
    color: '#000',
    fontSize: 12,
    fontFamily: Constants.fontFamilyBold,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImg: {
    // "zIndex": 9
  },
  markerImgActive: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    zIndex: 9999,
  },
  iconFull: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 40,
    backgroundColor: 'rgb(27, 229, 141)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChild: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'rgba(255,255,255,.8)',
    position: 'absolute',
    bottom: -10,
    right: 45,
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 9999,
    top: 25,
    left: -30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: Constants.fontFamilyBold,
    color: '#333',
    marginTop: 3,
    marginRight: 7,
    letterSpacing: 1.5,
    lineHeight: 14,
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  textMore: {
    fontSize: 11,
    textAlign: 'right',
    color: Color.tabbarTint,
    marginTop: 12,
  },
  wrapMarker: {
    bottom: 13,
    left: 10,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  imgLocatePost: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  foodMain: {
    bottom: 15,
    left: -10,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  imgLocate: {
    resizeMode: 'contain',
    width: 120,
    borderRadius: 4,
  },
  youreHere: {
    fontFamily: Constants.fontFamily,
    fontSize: 11,
    alignSelf: 'center',
  },
  slideInnerContainer: {
    width: width / 3 + 30,
    height: Platform.OS == 'ios' ? width / 3 : width / 3 + 10,
    borderRadius: 5,
    marginBottom: 5,
    zIndex: 9999,
  },
  imageContainer: {
    height: width / 3,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 5,
    zIndex: 9999,
  },
  wrapText: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 10,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 4,
    shadowOffset: { width: 0, height: -12 },
  },
  //head Address
  row: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    width: 80,
    paddingLeft: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 4,
    fontSize: 10,
    color: '#212121',
    fontFamily: Constants.fontFamilyBold,
    lineHeight: 18,
  },
  text: {
    color: '#555555',
    fontSize: 10,
    paddingTop: Platform.OS == 'android' ? 4 : 5,
    marginLeft: 3,
    lineHeight: 14,
    fontFamily: Constants.fontFamilyLight,
    alignSelf: 'flex-start',
  },
  imageIcon: {
    resizeMode: 'contain',
    width: 14,
    height: 14,
    zIndex: 999,
  },
  containerDetail: {
    marginTop: 10,
  },
  mapDetail: {
    height: height / 3,
    width: width,
    backgroundColor: 'red',
  },
  containerPick: {
    flex: 1,
  },
  mapPick: {
    height: height * 0.7,
    width: width,
    backgroundColor: '#FFF',
  },
  searchBar: {
    backgroundColor: 'transparent',
    zIndex: 9999,
    // top: Device.isIphoneX ? 40 : 20,
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 5,
  }
})