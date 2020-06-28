/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    textAlign: 'right',
    padding: 30,
  },
  dot: {
    backgroundColor: 'rgba(255, 244, 235, 0.5)',
    width: 10,
    height: 2,
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 4,
  },

  dotActive: {
    backgroundColor: 'rgba(255, 244, 235, 0.9)',
    width: 20,
    height: 2,
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 4,
  },

  image: {
    width: width - 45,
    height: Constants.Window.bannerHeight - 30,
    resizeMode: 'cover',
    borderRadius: 12
  },
  imageView: {
    width: width - 45,
    height: Constants.Window.bannerHeight - 30,
    marginLeft: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    borderRadius: 12,
    elevation: 5, 
  }
})
