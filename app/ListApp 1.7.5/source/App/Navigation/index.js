/** @format */

'use strict'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { Images, Color } from '@common'
import { TabBar, TabBarIcon } from '@components'
import TransitionConfig from './TransitionConfig'

import PostDetailScreen from './PostDetailScreen'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import CategoryScreen from './CategoryScreen'
import CategoriesScreen from './CategoriesScreen'
import MapScreen from './MapScreen'
import BookingsScreens from './MyBookingsScreen'
import ReadLaterScreen from './ReadLaterScreen'
import SearchScreen from './SearchScreen'
import HorizontalScreen from './HorizontalScreen'
import CustomPageScreen from './CustomPageScreen'
import UserProfileScreen from './UserProfileScreen'
import ChatScreen from './ChatScreen'
import LoginScreen from './LoginScreen'
import ChatListScreen from './ChatListScreen'
import CartScreen from './CartScreen'

import FilterScreen from './FilterScreen'
//userProfile
import PostNewListingScreen from './PostNewListingScreen'
import PostNewContentScreen from './PostNewContentScreen'
import PickMapScreen from './PickMapScreen'
import MyListingsScreen from './MyListingsScreen'

const HomeStack = createStackNavigator(
  {
    home: { screen: HomeScreen },
    horizontalScreen: { screen: HorizontalScreen },
    chat: { screen: ChatScreen },
    login: { screen: LoginScreen },
    category: { screen: CategoryScreen },
    search: { screen: SearchScreen },
  },
)

const categoriesStack = createStackNavigator({
  categories: { screen: CategoriesScreen },
  category: { screen: CategoryScreen },
})

const postNewListingStack = createStackNavigator({
  postNewListing: { screen: PostNewListingScreen },
  pickMap: { screen: PickMapScreen },
  postNewContent: { screen: PostNewContentScreen },
})

const readlaterStack = createStackNavigator({
  readlater: { screen: ReadLaterScreen },
})

const userProfileStack = createStackNavigator({
  userProfile: { screen: UserProfileScreen },
  postDetail: { screen: PostDetailScreen },
  chatList: {
    screen: ChatListScreen,
  },
  myListings: { screen: MyListingsScreen },
  bookings: { screen: BookingsScreens },
  cart: { screen: CartScreen },
  readlater: { screen: ReadLaterScreen },
})

const settingStack = createStackNavigator({
  setting: { screen: SettingScreen },
})

const BookingsStack = createStackNavigator({
  bookings: { screen: BookingsScreens },
})

const mapStack = createStackNavigator(
  {
    map: { screen: MapScreen },
    filter: { screen: FilterScreen },
  },
)

const loginStack = createStackNavigator(
  {
    login: { screen: LoginScreen },
  },
  {
    mode: 'modal',
    transitionConfig: () => TransitionConfig,
  }
)

export default {
  tabs: {
    home: {
      screen: HomeStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            iconStatic={Images.icons.homeListing}
            tintColor={tintColor}
          />
        ),
      },
    },

    map: {
      screen: mapStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={styles.icon}
            iconStatic={Images.icons.mapPin}
            tintColor={tintColor}
          />
        ),
      },
    },

    postNewListing: {
      screen: postNewListingStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            iconStatic={Images.PlusIcon}
            cssView={styles.plusIconView}
            css={styles.plusIcon}
            tintColor={Color.tabbarTint}
          />
        ),
      },
    },

    categories: {
      screen: categoriesStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            iconStatic={Images.icons.category}
            tintColor={tintColor}
          />
        ),
      },
    },

    bookings: {
      screen: BookingsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            css={{ width: 20, height: 18 }}
            iconStatic={Images.icons.calendar}
            tintColor={tintColor}
          />
        ),
      },
    },
    userProfile: {
      screen: userProfileStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon
            isBookMark
            hasChat
            iconStatic={Images.icons.iconUser}
            tintColor={tintColor}
          />
        ),
      },
    },

    // ignore tab icons

    chat: {
      screen: ChatScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    readlater: {
      screen: readlaterStack,
      navigationOptions: { header: null },
    },
    customPage: { screen: CustomPageScreen },
    setting: { screen: settingStack },
    login: { screen: loginStack },

    postDetail: {
      screen: PostDetailScreen,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  config: {
    // initialRouteName: 'map',
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#000',
      },
    },
    lazy: true,
  },
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  plusIconView: {
    ...Platform.select({
      ios: {
        top: -10,
        shadowColor: '#000',
        shadowOpacity: 0.02,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: -3 },
        borderRadius: 30,
      },
      android: {
        top: 0,
      },
    }),
    padding: 8,
    backgroundColor: '#FFF',
  },
  plusIcon: {
    width: 38,
    height: 38,
    tintColor: Color.tabbarTint,
    resizeMode: 'contain',
  },
})
