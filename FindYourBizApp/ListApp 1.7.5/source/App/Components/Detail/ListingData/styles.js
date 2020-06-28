/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Color, Constants } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingBottom: 30,
  },

  // for section general
  section: {
    marginTop: 20,
    paddingVertical: 20,

    backgroundColor: '#FFF',
    width: width ,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 3,
  },
  sectionMap: {
    paddingBottom: 0
  },

  // content
  content: {
    width: width - 10,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },

  iconRow: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 7,
    marginTop: 3,
    opacity: 0.5
  },

  // for section type is data
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#F0F0F0',
    paddingVertical: 3,
  },
  label: {
    color: '#000',
    width: 80,
    fontSize: 11,
    fontFamily: Constants.fontFamilyBold,
    lineHeight: 18,
    alignSelf: 'flex-start',
  },
  imageIcon: {
    tintColor: '#000',
    resizeMode: 'contain',
    width: 22,
    height: 22,
  },
  text: {
    color: '#000',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Constants.fontFamilyLight,
    alignSelf: 'flex-end',
  },

  boxItems: {
    marginHorizontal: 20,
  },
  //features
  boxFeature: {
    padding: 12,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginBottom: 15,
  },
  lineTitle: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    color: 'rgb(69,69,83)',
    fontFamily: Constants.fontFamilyLight,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '50%',
    alignItems: 'center',
  },
  iconFeature: {
    marginRight: 5,
  },
  nameFeature: {
    fontSize: 13,
  },

  //cates
  lineTitleCates: {
    width: '40%',
  },

  //map
  lineTitleMap: {
    width: '60%',
  },
  lineMapRight: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMap: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 12,
  },

  //related
  boxRelatedItems: {
   marginLeft: 10, 
  }
})
