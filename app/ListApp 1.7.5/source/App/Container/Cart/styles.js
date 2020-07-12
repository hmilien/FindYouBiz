/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Color, Device, Config, Constants } from '@common'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        paddingTop: Config.showStatusBar ? 12 : 0,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
  },
  indicator: {
    // marginTop: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },

  bottomView: {
    height: 40,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f7f9',
  },
  floatView: {
    width: Constants.Window.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBuyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    height: 30,
  },
  btnBuy: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.BuyNowButton,
  },
  btnBuyText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Constants.fontHeader,
  },
  btnBack: {
    flex: 0.5,
    backgroundColor: '#f5f5f5',
  },
  btnBackText: {
    color: '#999',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Constants.fontHeader,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CED7DD',
  },

  rowEmpty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  label: {
    fontSize: 18,
    color: Color.text,
    fontFamily: Constants.fontHeader,
  },
  value: {
    fontSize: 16,
    color: Color.headerTintColor,
    fontFamily: Constants.fontHeader,
  },

  contentEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: '#B7C4CB',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontHeader,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#758692',
    width: Constants.Window.width,
    marginTop: 10,
    lineHeight: 25,
    fontFamily: Constants.fontFamily,
  },

  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: Constants.fontHeader,
  },
  total: {
    fontSize: 16,
    marginLeft: 15,
    color: '#999',
  },

  iconZoom: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    zIndex: 9999,
  },
  textClose: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
    margin: 4,
    marginRight: 10,
    marginLeft: 10,
    zIndex: 9999,
  },
  webView: {
    flex: 1,
    paddingTop: 50,
  },
  modal: {
    marginTop: 95,
    // height: height - 200,
  },
  boxCalendar: {
    paddingHorizontal: 20,
    flex: 1,
  },

  //Empty
  headerLabel: {
    color: '#333',
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 22,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 60,
      },
      android: {
        top: 50,
      },
    }),
  },
  headerView: {
    width,
    ...Platform.select({
      ios: {
        height: 60,
      },
      android: {
        height: Config.showStatusBar ? 70 : 50,
      },
    }),
  },
  homeMenu: {
    marginLeft: 8,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: Device.isIphoneX ? 50 : 22,
      },
      android: {
        top: Config.showStatusBar ? 30 : 10,
      },
    }),
    zIndex: 9,
  },
})
