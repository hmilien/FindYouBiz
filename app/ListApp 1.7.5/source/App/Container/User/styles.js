/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Device, Constants } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
    marginTop: vh * 2,
    marginBottom: vh * 2,
  },
  toolbar: {
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: 50,
  },
  menu: {
    marginLeft: 4,
    marginTop: 8,
  },
  topLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  textTop: {
    fontSize: 16,
    fontWeight: '600',
    left: Constants.RTL ? width - vw * 30 : 10,
    marginTop: 10,
  },
  avatarView: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#eee',
    width: vh * 15,
    ...Platform.select({
      android: {
        height: vh * 15,
      },
    }),
  },
  avatar: {
    height: vh * 15,
    ...Platform.select({
      android: {
        width: vh * 15,
      },
    }),
    resizeMode: 'contain',
  },
  username: {
    color: '#2C3956',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: Constants.fontFamilyBold,
  },
  email: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  topBar: {
    width: width,
    height: 30,
    backgroundColor: Color.tabbarTint,
    flexDirection: Constants.RTL ? 'row-reverse' : 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
    marginTop: 10,
  },
  clearText: {
    marginRight: 0,
    color: '#ffffff',
  },

  iconTop: {
    marginTop: 10,
    marginLeft: 6,
  },
  content: {
    marginTop: Constants.Window.profileHeight,
    position: 'relative',
    flex: 1,
    marginBottom: 300,
  },
  scrollview: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    height: Constants.Window.profileHeight,
    alignItems: 'center',
  },
  profileView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    top: 50,
    left: 0,
    right: 0,
    width: null,
    height: Constants.Window.profileHeight,
  },
  profileSection: {
    backgroundColor: '#FFF',
    marginTop: 15,
  },
  //icon
  btnEdit: {
    position: 'absolute',
    right: 0,
    bottom: 35,
    zIndex: 9999,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  loginText: {
    marginTop: 20,
    color: '#666',
    fontSize: 16
  }
})
