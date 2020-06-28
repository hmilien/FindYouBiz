import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Config, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  wrapper: {
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, .85)',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginRight: 10,
    marginTop: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Constants.fontFamilyBold,
  },
  contentLabel: {
    fontFamily: Constants.fontFamilyLight,
    fontSize: 14,
    color: Color.Text,
    marginLeft: 8,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  alignSelf: {
    textAlign: 'center',
  },
  knob: {
    width: 38,
    height: 7,
    marginTop: 10,
    borderRadius: 3,
    shadowColor: 'rgba(15, 15, 15, 0.7)',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: Color.main
  },
  fullLine: {
    flex: 1,
    width: width,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(15, 15, 15, 0.7)',
    overflow: 'visible',
    shadowColor: 'rgba(15, 15, 15, 0.7)',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 6 },
  },
})
