/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Device, Constants, Styles } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideHeight = viewportHeight * 0.8
const slideWidth = wp(85)
const itemHorizontalMargin = wp(2)
export const itemWidth = slideWidth + itemHorizontalMargin * 2

export default StyleSheet.create({
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 6,
    top: (height * 30) / 100,
    width: (width * 96) / 100,
    height: (height * 70) / 100,
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  modalDefault: {
    position: 'absolute',
    borderRadius: 6,
    width: width,
    top: (height * 5) / 100,
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 9999,
  },
  wrap: {
    flex: 1,
    zIndex: 9999,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 1)',
    borderRadius: 6,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  iconZoom: {
    position: 'absolute',
    right: 7,
    top: Device.isIphoneX ? 30 : 10,
    backgroundColor: 'transparent',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    marginRight: 10,
    zIndex: 9999,
  },
  flatlistTag: {
    flex: 1,
    paddingTop: 50,
    paddingRight: 50,
    paddingBottom: 50,
    paddingLeft: 50,
  },
  boxTag: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 20,
  },
  textTag: {
    color: 'rgba(0,0,0,1)',
    fontSize: 24,
    fontWeight: '200',
  },
  newsIcons: {
    marginLeft: 2,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 3,
  },
  imageIcon: {
    marginLeft: 2,
    marginRight: 0,
    marginTop: 0,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    marginBottom: 10,
    shadowColor: '#000',
    width: 30,
    resizeMode: 'contain',
    zIndex: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIconActive: {
    color: Color.tabbarTint,
  },
  icon: {
    marginRight: 4,
    marginTop: 8,
    width: 30,
    height: 30,
  },
  rowView: {
    width: width / 2 - 40,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: 100,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowActive: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
    borderRadius: 9,
  },
  text: {
    fontSize: 12,
    fontWeight: '200',
    lineHeight: 12,
  },
  layoutBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 10,
  },
  scrollModal: {
    width: (width * 90) / 100,
  },
  closeRight: {
    right: 20,
  },
  boxFilter: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: 999,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 0,
  },
  boxComment: {
    position: 'absolute',
    top: 40,
    bottom: 40,
    width: width,
    height: height,
    flex: 1,
    backgroundColor: '#FFF',
    zIndex: 999,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  rowTitle: {
    marginTop: 15,
  },
  rowTitleText: {
    color: 'rgb(146, 146, 175)',
    fontSize: 12,
  },
  rowFilter: {
    width: width - 40,
    flexDirection: 'row',
    marginTop: 15,
  },
  rowFilterLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rowFilterRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    color: 'rgb(69, 69, 83)',
    fontSize: 14,
    fontFamily: Constants.fontFamily,
  },

  wrapReserve: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 20,
    zIndex: 9999,
    borderRadius: 4,
    backgroundColor: 'rgb(27, 229, 141)',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 44,
  },
  textReserve: {
    color: Color.reserveText,
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
  imgReverse: {
    alignSelf: 'center',
    marginTop: 3,
    marginLeft: 15,
    resizeMode: 'contain',
    width: 30,
    height: 20,
  },
  textCloseBooking: {
    fontSize: 18,
  },
  modalBoxWrapPhoto: {
    position: 'absolute',
    borderRadius: 2,
    width: width,
    height: height,
    zIndex: 9999,
    top: 0,
    left: 0,
  },
  iconZoomPhoto: {
    position: 'absolute',
    right: 10,
    top: Device.isIphoneX ? 40 : 20,
    backgroundColor: 'rgba(255,255,255,.9)',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: '#666',
    fontWeight: '600',
    fontSize: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height - 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 40,
    fontFamily: Constants.fontFamilyBold,
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    color: 'gray',
    lineHeight: 25,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.tabbarTint,
  },
  buttonText: {
    fontSize: 13,
    color: '#FFF',
    fontFamily: Constants.fontFamily,
  },

  sliderContainer: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  slider: {
    marginTop: 15,
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },

  imageTitle: {
    position: 'absolute',
    bottom: -20,
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },

  // close Comment
  textComment: {
    fontSize: 22,
  },
  // Filter Search
  boxAdvance: {
    flex: 1,
    paddingTop: 35,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    backgroundColor: '#FFF',
    zIndex: 9999,
  },
  all: {
    // flex: 1,
    backgroundColor: '#FFF',
    // width,
    // height,
    paddingTop: 30,
    paddingBottom: 120,
  },
  fullSearch: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
    zIndex: 999,
    left: 0,
  },
  btnSearch: {
    backgroundColor: Color.main,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 30,
    marginHorizontal: 15,
    shadowColor: 'rgba(15, 15, 15, 0.7)',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    flex: 1,
    alignItems: 'center',
    elevation: 3,
  },
  txtSearch: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
  btnClear: {
    backgroundColor: '#FFF',
    shadowOpacity: 0.2,
  },
  txtClear: {
    color: '#000',
  },
  //booking
  isBooking: {
    paddingBottom: 20,
  }
})
