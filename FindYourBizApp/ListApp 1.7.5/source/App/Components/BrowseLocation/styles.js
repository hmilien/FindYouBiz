/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 4,
  },
  rowWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: width - 40,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: "'rgba(205, 212, 232, 0.5)'",
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  imgLocation: {
    width: 17,
    height: 17,
    marginRight: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textLocation: {
    color: '#000',
    fontSize: 15,
    fontFamily: Constants.fontFamilyLight,
  },
  arrLocation: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 11,
    height: 11,
  },
})
