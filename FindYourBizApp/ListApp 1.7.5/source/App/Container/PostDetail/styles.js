/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Color, Constants } from '@common'
const { width, height } = Dimensions.get('window')
const vw = width / 100
const vh = height / 100

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(240, 240, 240, 1)',
    ...Platform.select({
      android: {
        paddingTop: 20,
      },
    }),
  },

  image: {
    width: vw * 40,
    height: 90,
    resizeMode: 'cover',
    marginLeft: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  boxContent: {
    backgroundColor: '#F5F5F5',
    padding: 6,
  },
  content: {
    textAlign: 'justify',
  },

  color: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EBEBEB',
  },
  title: {
    color: '#333',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '200',
    marginTop: 12,
  },
  titleSmall: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  productItem: {
    width: width - 30,
    height: 400,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  tailBlock: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    width,
  },
  scrollView: {
    paddingTop: Constants.Window.bannerHeight,
    paddingBottom: Constants.Window.bannerHeight / 3,
  },
  rowTitle: {
    flexDirection: 'row',
    width,
    marginHorizontal: 15,
    marginTop: 0,
  },
  aboveBooking: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnHeadRight: {
    paddingRight: 20,
  },
  iconHeadRight: {
    tintColor: '#4185F5',
    resizeMode: 'contain',
  },
  postTitle: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '500',
    fontSize: 30,
    fontFamily: Constants.fontFamily,
    textAlign: Constants.RTL ? 'right' : 'left',
    backgroundColor: 'transparent',
    zIndex: 9999,
    width: width * 0.8,
  },

  subTitle: {
    color: '#000',
    marginRight: 16,
    marginBottom: 14,
    marginLeft: 15,
    marginTop: Platform.OS == 'ios' ? 10 : 7,
    fontSize: 14,
    fontFamily: Constants.fontFamilyLight,
    textAlign: Constants.RTL ? 'right' : 'left',
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  headAddress: {
    zIndex: 9999,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingTop: 10,
    width,
  },
  largeImage: {
    width,
    height: width - 120,
    resizeMode: 'cover',
  },
  largeContent: {
    width,
    position: 'absolute',
    bottom: 0,
    height: 100,
  },
  largeTitle: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
  },
  description: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },

  detailPanel: {
    height: 380,
    width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toolbar: {
    backgroundColor: 'black',
  },
  shareIcon: {
    flexDirection: 'row',
    width: 100,
    position: 'absolute',
    right: 0,
    bottom: 16,
  },
  newsIcons: {
    color: '#999',
    marginLeft: 20,
  },
  newsTitle: {
    fontSize: 18,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    color: 'white',
    fontWeight: '400',
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    resizeMode: 'cover',
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
  },
  wrapComment: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F7F7F7',
    flex: 2 / 6,
  },
  headCommentText: {
    fontSize: 20,
    fontWeight: '600',
  },
  titleVideo: {
    flex: 1 / 6,
    paddingLeft: 15,
    paddingRight: 12,
  },
  titleVideoText: {
    fontSize: 18,
    color: 'rgb(11,6,6)',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  countViews: {
    flex: 1 / 6,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 5,
  },
  countViewsText: {
    fontSize: 18,
    lineHeight: 18,
    color: 'rgb(149,149,149)',
  },
  wrapLikeShare: {
    flex: 1 / 6,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wrapLikeShareInner: {
    flexDirection: 'row',
  },
  icon: {
    flexDirection: 'row',
    marginRight: 10,
  },
  numberIcon: {
    marginLeft: 5,
    fontSize: 18,
  },
  author: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    textAlign: Constants.RTL ? 'right' : 'left',
  },
  address: {
    color: 'rgb(146, 146, 175)',
    fontSize: 14,
    marginTop: 6,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    alignSelf: 'flex-start',
    fontFamily: Constants.fontFamily,
  },
  descTitle: {
    color: 'rgb(69,69,83)',
    fontSize: 24,
    marginLeft: 12,
    fontFamily: Constants.fontFamilyLight,
  },
  content: {
    color: '#333',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 8,
    marginRight: 10,
    marginBottom: 8,
    marginLeft: 10,
    alignSelf: 'flex-start',
    fontFamily: Constants.fontFamilyLight,
  },
  relatedPostText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  linearTop: {
    position: 'absolute',
    width,
    height: 40,
    top: 0,
    left: 0,
    zIndex: 99,
  },
  shareIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    width,
    right: 4,
    top: 8,
    zIndex: 999,
  },
  videoView: {
    backgroundColor: 'rgba(0,0,0, .8)',
    flex: 1,
  },
  video: {
    height: vh * 40,
    width,
    marginTop: 25,
    backgroundColor: '#000',
  },
  wrapHours: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  headHours: {
    marginBottom: 7,
  },
  textHours: {
    fontFamily: Constants.fontFamily,
    fontSize: 14,
    color: 'rgb(146, 146, 175)',
  },
  textWork: {
    fontFamily: Constants.fontFamilyBold,
    fontSize: 16,
    color: 'rgb(69, 69, 83)',
  },
  wrapReserve: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: 'rgb(27, 229, 141)',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: (width / 10) * 2 - 20,
  },
  textReserve: {
    color: Color.reserveText,
    fontSize: 20,
    fontFamily: Constants.fontFamilyBold,
  },
  imgReverse: {
    alignSelf: 'center',
    marginTop: 3,
    marginLeft: 15,
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    // marginTop: Platform.OS == 'ios' ? Constants.Window.height/2 - 60 : Constants.Window.height/2 + 50,
    marginTop: 30,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: Constants.fontFamilyLight,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 8,
    // paddingLeft: 14,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // zIndex: 9999,
  },
  row1: {
    flex: 1 / 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  row2: {
    flex: 3 / 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  label: {
    color: '#000',
    // width: 80,
    // paddingLeft: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 4,
    fontSize: 11,
    fontFamily: Constants.fontFamilyBold,
    lineHeight: 18,
  },
  imageIcon: {
    tintColor: '#000',
  },
  text: {
    color: '#000',
    fontSize: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 5,
    // width: width * 0.7,
    lineHeight: 18,
    fontFamily: Constants.fontFamilyLight,
    // alignSelf: 'flex-start',
  },

  // button booking

  // btnBooking: {
  //   flex: 1,
  //   backgroundColor: 'rgba(27, 229, 141, 1)',
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginRight: 10,
  //   ...Platform.select({
  //     android: {
  //       marginBottom: 8,
  //     },
  //   }),
  // }

  /* news */
  headerNews: {
    backgroundColor: 'rgba(4, 0, 255, 1)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: Constants.Window.bannerHeight,
  },
  detailDescNews: {
    color: '#333',
    width: width - 20,
    marginTop: 16,
    marginRight: 16,
    marginBottom: 2,
    marginLeft: 13,
    fontWeight: '500',
    fontSize: 22,
    textAlign: Constants.RTL ? 'right' : 'left',
    zIndex: 9999,
  },
  imageBackGroundNews: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width,
    height: Constants.Window.bannerHeight,
  },

  // close button
  fab: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 50,
    height: 40,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#FFF',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  //review
  wrapReview: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 15,
  },
  avgReview: {
    color: Color.actactiveReviewive,
    fontSize: 12,
    marginRight: 5,
  },
  reviewStar: {
    marginRight: 10,
    marginBottom: 2,
    alignSelf: 'flex-end',
  },

  //Chat Button
  btnChatBox: {
    flex: 1,
    backgroundColor: 'rgba(27, 229, 141, 1)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnChatText: {
    color: '#FFF',
    fontSize: 13,
    fontFamily: Constants.fontFamilyBold,
  },

  wrapPrice: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 15,
  },
  price: {
    color: '#000',
    fontSize: 16,
    fontFamily: Constants.fontFamilyBold,
  },
  currency: {
    color: '#000',
    fontSize: 13,
    marginLeft: 3,
    fontFamily: Constants.fontFamilyBold,
    alignSelf: 'center',
  },
  ratingTextSmall: {
    fontSize: 10,
    fontFamily: Constants.fontFamilyLight,
  },
  headerTop: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  iconBack: {
    backgroundColor: 'transparent',
    tintColor: '#fff',
    width: 20,
    height: 18,
    zIndex: 9999,
    resizeMode: 'contain',
  },
  iconBooking: {
    backgroundColor: 'transparent',
    width: 24,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#FFF',
    marginRight: 5,
  },
  chatText: {
    fontFamily: Constants.fontFamilyLight,
    fontSize: 12,
    color: 'rgba(7, 7, 7, .43)',
  },

  //listing data
  wrapTitle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    marginLeft: 12,
    marginTop: 12,
    fontSize: 24,
    color: 'rgb(69,69,83)',
    fontFamily: Constants.fontFamilyLight,
  },

  boxInfo: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
})
