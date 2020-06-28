/** @format */

import React, { Component } from 'react'
import {
  View,
  Animated,
  Platform,
  TouchableOpacity,
  Image,
  Switch,
  AsyncStorage,
  Text,
} from 'react-native'
import { Events, Color, Constants, Languages, Tools, Config } from '@common'
import { UserProfileHeader, UserProfileItem, LogoSpinner } from '@components'
import styles from './styles'
import {
  fetchPostsBookmark,
  fetchPostsByUser,
  clearPosts,
  clearUserData,
} from '@redux/actions'
import { connect } from 'react-redux'
import { Menu, Logout, User } from '@navigation/Icons'
import UserModal from '@services/User'
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 42 : 42
const HEADER_SCROLL_DISTANCE =
  Constants.Window.profileHeight - HEADER_MIN_HEIGHT

class UserComp extends Component {
  state = { scrollY: new Animated.Value(0), pushNotification: false }

  async componentDidMount() {
    this.props.fetchPostsBookmark()

    if (this.props.userData != null) {
      this.props.fetchPostsByUser(this.props.userData.id)
    }
    Events.onLogoutUser(this.logOutUser)

    const notification = await Tools.getNotification()

    this.setState({
      pushNotification: notification || false,
      isLoading: false,
    })
  }

  logOutUser = () => {
    this.props.clearPosts()
    this.props.clearUserData()
    UserModal.logOut()
  }

  _handlePress = (item) => {
    const { navigation } = this.props
    const { routeName, isActionSheet } = item

    if (routeName && !isActionSheet) {
      navigation.navigate(routeName, item.params)
    }

    if (isActionSheet) {
      this.currencyPicker.openModal()
    }
  }

  _handleSwitch = (value) => {
    AsyncStorage.setItem('@notification', JSON.stringify(value), () => {
      this.setState({
        pushNotification: value,
      })
    })
  }

  _getListItem = () => {
    const { bookmark, carts, myListings, myOrders, userData } = this.props
    const myBookings = typeof myOrders != 'undefined' ? myOrders.length : 0
    const numBookmark =
      typeof bookmark.posts != 'undefined' ? bookmark.posts.length : 0
    const numListings =
      typeof myListings !== 'undefined' ? myListings.length : 0
    let listItem = [
      {
        label: Languages.userProfileWishlist,
        routeName: 'readlater',
        value: `${numBookmark} ${Languages.userProfileItems}`,
      },
      {
        label: Languages.userProfilePushNotif,
        icon: () => (
          <Switch
            onValueChange={this._handleSwitch}
            value={this.state.pushNotification}
            tintColor={Color.blackDivide}
          />
        ),
      },

      ...Config.userProfileMenu,
    ]

    // show up the my booking menu
    if (userData) {
      listItem = [
        {
          label: Languages.myListings,
          routeName: 'myListings',
          value: `${numListings} ${Languages.userProfileItems}`,
        },
        Config.Booking.enable && {
          label: Languages.MyCart,
          routeName: 'cart',
          value: `${carts.total} ${Languages.userProfileItems}`,
        },
        Config.Booking.enable && {
          label: Languages.myBookings,
          routeName: 'bookings',
          value: `${myBookings} ${Languages.userProfileItems}`,
        },
        {
          label: Languages.chatList,
          routeName: 'chatList',
          value: '',
        },
        ...listItem,
      ]
    }

    return listItem
  }

  _renderToolbar = () => {
    const { userData } = this.props
    const toolbarTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View
        style={[
          styles.toolbar,
          {
            transform: [{ translateY: toolbarTranslate }],
          },
        ]}>
        <View style={styles.menu}>{Menu()}</View>
        {userData && Logout()}
      </Animated.View>
    )
  }

  _renderHeader = () => {
    const { userData, onLogIn } = this.props
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 50],
      extrapolate: 'clamp',
    })

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}>
        <Animated.View
          style={[
            styles.profileView,
            {
              opacity: animateOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}>
          <UserProfileHeader userData={userData} />

          {!userData && (
            <TouchableOpacity onPress={onLogIn}>
              <Text style={styles.loginText}>{Languages.login}</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
        {this._renderToolbar()}
      </Animated.View>
    )
  }

  render() {
    const { isLoading } = this.state
    if (isLoading) {
      return <LogoSpinner fullStretch={true} />
    }
    const { userData } = this.props
    const listItem = this._getListItem()

    return (
      <View style={styles.body}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
          <View style={styles.content}>
            {userData && (
              <View style={styles.profileSection}>
                <UserProfileItem
                  label={Languages.userProfileName}
                  onPress={this._handlePress}
                  value={
                    typeof userData.username != 'undefined'
                      ? userData.username
                      : ''
                  }
                />
                <UserProfileItem
                  label={Languages.userProfileEmail}
                  value={
                    typeof userData.email != 'undefined' ? userData.email : ''
                  }
                />
                <UserProfileItem
                  label={Languages.userProfileAddress}
                  value={
                    typeof userData.billing != 'undefined' &&
                    userData.billing != null
                      ? userData.billing.address_1
                      : ''
                  }
                />
              </View>
            )}

            <View style={styles.profileSection}>
              {listItem.map((item, index) => {
                return (
                  <UserProfileItem
                    icon
                    key={index}
                    onPress={() => this._handlePress(item)}
                    {...item}
                  />
                )
              })}
            </View>
          </View>
        </Animated.ScrollView>

        {this._renderHeader()}
      </View>
    )
  }
}
const mapStateToProps = ({ carts, user, bookmark, orders }) => ({
  user,
  bookmark,
  myOrders: orders.myOrders,
  myListings: user.listings,
  carts,
})
export default connect(
  mapStateToProps,
  {
    fetchPostsBookmark,
    clearPosts,
    clearUserData,
    fetchPostsByUser,
  }
)(UserComp)
