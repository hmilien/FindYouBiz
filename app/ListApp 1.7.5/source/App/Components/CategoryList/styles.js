import React, { StyleSheet, Dimensions } from 'react-native'
import { Color, Constants, Styles } from '@common'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  flatlist: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  more: {
    width: width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  spinView: {
    width: width,
    backgroundColor: '#fff',
    flex: 1,
    height: height,
    paddingTop: 20,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 40,
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowText: {
    color: 'white',
    fontSize: 18,
  },

  toolbarView: {
    height: 70,
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarText: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 20,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleView: {
    width: width - 90,
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
  description: {
    fontSize: 15,
    color: '#fff',
    marginTop: 4,
    backgroundColor: 'transparent',
    width: width - 90,
    fontFamily: Constants.fontFamily,
  },
})
