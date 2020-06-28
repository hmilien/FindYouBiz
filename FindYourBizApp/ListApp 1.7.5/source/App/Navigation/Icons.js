/** @format */

import React, { Component } from 'react'
import {
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { Events, Constants, Images, Languages } from '@common'
const PAGE_WIDTH = Dimensions.get('window').width
const vw = PAGE_WIDTH / 100

const styles = StyleSheet.create({
  toolbarIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginTop: 2,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    opacity: 0.8,
  },
  toolbarIconUser: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    opacity: 1,
    right: 20,
    left: !Constants.RTL && Platform.OS != 'android' ? vw * 5 : 20,
    top: Platform.OS != 'android' ? 5 : 10,
    zIndex: 9999,
    flex: 1,
  },
  longBack: {
    width: 25,
  },
  clearText: {
    color: '#333',
    textDecorationLine: 'underline',
    marginRight: 0,
  },
  menuIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginTop: 2,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 14,
    opacity: 0.8,
  },
})

export const Menu = () => (
  <TouchableOpacity onPress={Events.openLeftMenu}>
    <Image source={Images.icons.iconBurger} style={styles.menuIcon} />
  </TouchableOpacity>
)

export const Layer = () => (
  <TouchableOpacity onPress={Events.openModalLayout}>
    <Image
      source={{ uri: Images.icons.layer }}
      style={[styles.toolbarIcon, { marginTop: 6, marginRight: 6 }]}
    />
  </TouchableOpacity>
)

export const Layout = (onPress) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={{ uri: Images.icons.layer }}
      style={[styles.toolbarIcon, { marginTop: 6, marginRight: 6 }]}
    />
  </TouchableOpacity>
)

export const Back = (
  func,
  iconBack = { uri: Images.icons.back },
  tintColor = '#FFF'
) => (
  <TouchableOpacity onPress={func}>
    <Image
      source={iconBack}
      style={[{ tintColor: tintColor }, styles.toolbarIcon, styles.longBack]}
    />
  </TouchableOpacity>
)

export const Next = () => (
  <TouchableOpacity onPress={Events.nextPost}>
    <Image
      source={{ uri: Images.icons.next }}
      style={[
        styles.toolbarIcon,
        { width: 60, height: 12, marginRight: 0, marginTop: 18, opacity: 0.8 },
      ]}
    />
  </TouchableOpacity>
)

export const Clear = () => (
  <TouchableOpacity onPress={Events.clearPosts}>
    <Text style={styles.clearText}>{Languages.clear}</Text>
  </TouchableOpacity>
)

export const User = (func = {}) => (
  <TouchableOpacity onPress={() => func && func()}>
    <Image source={{ uri: Images.icons.user }} style={[styles.toolbarIcon]} />
  </TouchableOpacity>
)

export const Logout = () => (
  <TouchableOpacity onPress={Events.logoutUser}>
    <Image source={{ uri: Images.icons.logout }} style={styles.toolbarIcon} />
  </TouchableOpacity>
)

export const SettingUser = (navigation, route = 'userProfile') => (
  <TouchableOpacity onPress={() => navigation.navigate(route)}>
    <Image source={Images.icons.iconUser} style={styles.toolbarIcon} />
  </TouchableOpacity>
)
