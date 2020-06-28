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
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textHeading: {
    fontSize: 16,
  },
  pickers: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingHorizontal: 20,
    marginBottom: 90,
    flexDirection: 'row',
  },
  picker: {
    fontSize: 14,
  },
  textInput: {
    borderColor: '#ccc',
    width: 40,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#eee',
  },
  selectCal: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10, 
    color: '#333',
    fontFamily: Constants.fontFamily,
  },
})
