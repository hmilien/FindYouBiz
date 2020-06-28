/** @format */

import React, {Component} from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Color } from '@common'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: -2 },

    // borderTopWidth: 0.5,
    // borderTopColor: '#eee',
  },
  tab: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class TabBar extends Component {
  constructor(props) {
    super(props);
  }
  
  onPress(key) {
    this.props.navigation.navigate(key)
  }

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      jumpToIndex,
      colorConfig,
    } = this.props

    const { routes } = navigation.state

    const ignoreMenu = [
      'postDetail',
      'customPage',
      'setting',
      'login',
      'readlater',
      'chat',
      'bookings',
      'search',
      'filter',
    ]

    return (
      <View
        style={[
          styles.tabbar,
          {
            backgroundColor:
              typeof colorConfig != 'undefined' && colorConfig.length != 0
                ? colorConfig.tabbar
                : Color.tabbar,
          },
        ]}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index
            const tintColor = focused ? activeTintColor : inactiveTintColor
            if (ignoreMenu.indexOf(route.key) > -1) {
              return <View key={route.key} />
            }

            if (
              this.props.user == null &&
              (route.key === 'bookings' ||
                route.key === 'chatList' ||
                route.key === 'postNewListing')
            ) {
              return <View key={route.key} />
            }

            if (route.key === 'postNewListing' && this.props.isLoginFB) {
              return <View key={route.key} />
            }

            return (
              <TouchableWithoutFeedback
                key={route.key}
                style={styles.tab}
                onPress={this.onPress.bind(this, route.key)}>
                <Animatable.View ref={'tabItem' + index} style={styles.tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor,
                  })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
    )
  }
}

const mapStateToProps = ({ user, config }) => ({
  user: user.data,
  isLoginFB: user.isLoginFB,
  colorConfig: config.color,
})
export default connect(mapStateToProps)(TabBar)
