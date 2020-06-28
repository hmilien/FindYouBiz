/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants } from '@common'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 0,
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: Constants.fontFamily,
    marginVertical: 15,
  },
  msgWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg: {
    fontSize: Constants.fontText.fontSizeMax,
    fontFamily: Constants.fontFamily,
    color: '#999',
  },
  loadingContainer: {
    height: height * 0.8,
  },
  panel: {
    flex: 1,
    marginBottom: 15,
    borderRadius: 8,
  },
  imagePanel: {
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  title: {
    flex: 1,
    width: 130, 
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: Constants.fontFamilyBold,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  count: {
    fontSize: 15,
    color: '#fff',
    marginTop: 4,
    backgroundColor: 'transparent',
    fontFamily: Constants.fontFamily,
  },
  headerTitle: {
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    letterSpacing: 0.5,
    fontFamily: Constants.fontFamilyBold,
  },
  linearGradient: {
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 8,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 30,
    paddingBottom: 10,
  },
  txtFilter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  txtText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '400',
    fontStyle: 'italic'

  },
  //close Button
  closeWrap: {
    position: 'absolute',
    top: 2,
    right: 10,
    zIndex: 9999,
  },
  btnCloseSearch: {
    zIndex: 9999,
  }
})
