/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { Color, Config, Constants, Device, Styles } from '@common'

export default StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginTop: 30,
  },
  all: {
    margin: 0,
    padding: 0,
  },
  labelText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'rgba(235, 238, 241, 0.8)',
    borderRadius: 45,
    borderWidth: 0,
  },
  label: {
    color: '#000',
    fontSize: 12,
    paddingHorizontal: 7,
  },
  itemSelected: {
    backgroundColor: 'rgba(59, 186, 173, 1.00)',
  },
  labelSelected: {
    color: '#FFF',
  },
})
