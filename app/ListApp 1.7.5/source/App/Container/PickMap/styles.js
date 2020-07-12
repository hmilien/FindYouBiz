/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  boxLocation: {
    margin: 10,
    flexDirection: 'row',
    borderRadius: 2,
    backgroundColor: 'red',
    ...Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1.5,
      },
    }),
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#aaa',
    marginHorizontal: 10,
    position: 'absolute',
    left: 5,
    top: 30,
  },
  input: {
    fontSize: 16,
    fontFamily: Constants.fontFamily,
    paddingVertical: 7,
    paddingLeft: 5,
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
})
