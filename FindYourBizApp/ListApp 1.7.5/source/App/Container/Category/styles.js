import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Colors, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
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
  fill: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
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
    height: height * 90 / 100,
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
    flex: 1,
    alignItems: 'center',
    marginLeft: 15,
    height: 150,
    marginBottom: 30,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    fontFamily: Constants.fontFamilyBold,
  },
  containerStyle: {
    shadowColor: '#000',
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
    marginTop: 10,
  },
  toolbarView: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarText: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 20,
  },
  toolbarIcon: {
    marginTop: 18,
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
})
