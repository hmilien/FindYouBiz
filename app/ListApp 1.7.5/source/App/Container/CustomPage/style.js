import React, { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  html: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  body: {
    paddingTop: Platform.OS == 'android' ? 0 : 30,
    backgroundColor: '#eee',
    flex: 1,
  },
})
