import {
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Constants } from '@common'

const { width, height } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  panel: {
    backgroundColor: '#FFF',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
  },
  content: {
    width: vw * 63,
    marginLeft: vw * 2,
  },
  title: {
    fontSize: 16,
    marginLeft: 4,
    marginTop: 12,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
    fontFamily: Constants.fontFamilyBold,
    textAlign: Constants.RTL ? 'right' : 'left',
  },
  description: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 10,
    marginRight: 8,
    color: '#333',
    fontFamily: Constants.fontFamilyLight,
    fontWeight: '300',
  },

  image: {
    marginLeft: vw * 2,
    marginRight: vw * 2,
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 31,
    height: vw * 25,
    // resizeMode: 'cover',
    borderRadius: 2,
  },
  heart: {
    position: 'absolute',
    zIndex: 9999,
    top: 1,
    right: 0,
  },

  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginRight: 18,
    marginBottom: 18,
    marginLeft: 25,
    zIndex: 9999,
    width: 18,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 35,
    right: 45,
    zIndex: 999,
    width: 40,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    height: 40,
    borderRadius: 40,
  },

  nameSub: {
    color: '#333',
    fontSize: 12,
    marginLeft: 3,
    alignSelf: 'flex-start',
    width: width / 3 - 10,
    fontFamily: Constants.fontFamily,
  },

  panelList: {
    backgroundColor: '#FFF',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
  },
  imageList: {
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 30,
    height: vw * 30 - 20,
    // resizeMode: 'cover',
    borderRadius: 2,
  },
  titleList: {
    width: vw * 65,
    marginTop: 4,
  },
  nameList: {
    fontSize: 16,
    marginLeft: 2,
    marginTop: 6,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
    fontFamily: Constants.fontFamily,
  },
  descriptionList: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 6,
    marginRight: 8,
    color: '#333',
    fontWeight: '300',
    fontFamily: Constants.fontFamilyLight,
  },

  //rating

  wrapRating: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  price: {
    color: '#333',
    fontSize: 11,
    marginLeft: 3,
    alignItems: 'center',
    fontFamily: Constants.fontFamily,
  },
  countText: {
    fontSize: 11,
    marginLeft: 5,
    fontFamily: Constants.fontFamily,
    color: '#666',
  },
})
