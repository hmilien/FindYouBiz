'use strict'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import css from './style'
import { Events, Images } from '@common'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { clearUserData } from '@redux/actions'
import { ImageCache } from '@components'

class SideMenuIcons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: props.menus,
    }
  }

  goToScreen = (routeName, params = {}) => {
    this.props.goToScreen(routeName, params, false)
    Events.closeLeftMenu()
  }

  logout = () => this.props.clearUserData()

  render() {
    const { userData } = this.props
    const menus = userData
      ? this.props.menus.filter(item => item.route != 'login')
      : this.props.menus

    const renderItem = (item, index) => (
      <TouchableOpacity
        onPress={() => this.goToScreen(item.route, item.params)}
        style={[css.menuRowLeft, this.props.rowStyle]}
        underlayColor="#2D2D30"
      >
        <Icon name={item.icon} style={[css.icon, this.props.iconStyle]} />
        <Text style={[css.menuLinkSmall]}>{item.name}</Text>
      </TouchableOpacity>
    )

    return (
      <ScrollView>
        <View style={[css.sideMenuLeft, this.props.menuBody]}>
          {userData && (
            <View style={css.avatarView}>
              <ImageCache
                style={css.avatar}
                source={{
                  uri:
                    userData != null && typeof userData.picture != 'undefined'
                      ? userData.picture.data.url
                      : Images.person,
                }}
              />
            </View>
          )}

          {menus.map((item, index) => renderItem(item, index))}
          {userData && (
            <TouchableOpacity
              onPress={this.logout}
              style={[css.menuRowLeft, css.menuSignOut, this.props.rowStyle]}
              underlayColor="#2D2D30"
            >
              <Text
                style={[
                  css.menuLinkLeft,
                  css.logoutLinkLeft,
                  this.props.textColor,
                ]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data,
})
export default connect(mapStateToProps, { clearUserData })(SideMenuIcons)
