/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import css from './style'
import { Events, Tools, Languages } from '@common'
import { connect } from 'react-redux'
import { clearPosts, clearUserData } from '@redux/actions'
import { ImageCache } from '@components'
import Icon from 'react-native-vector-icons/Octicons'

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: props.menus,
    }
  }

  goToScreen = (routeName, params = {}) => {
    this.props.goToScreen(routeName, params)
    Events.closeLeftMenu()
  }

  _logout = () => {
    this.props.clearPosts()
    this.props.clearUserData()
  }

  render() {
    const { userData } = this.props
    const menus = userData
      ? this.props.menus.filter((item) => item.route != 'login')
      : this.props.menus

    const renderItem = (item, index) => (
      <TouchableOpacity
        key={index}
        style={[css.menuRow, this.props.rowStyle]}
        underlayColor="#2D2D30"
        onPress={() => this.goToScreen(item.route, item.params)}>
        <Text style={[css.menuLink, this.props.textColor]}>
          {item.name ? Languages[item.name] : ''}
        </Text>
      </TouchableOpacity>
    )

    return (
      <View style={[css.sideMenu, this.props.menuBody]}>
        {userData ? (
          <View style={css.profile}>
            <View style={css.avatarView}>
              <ImageCache
                style={css.avatar}
                source={{
                  uri: Tools.getAvatar(userData),
                }}
              />
            </View>

            <Text style={[css.email, this.props.textColor]}>
              {Tools.getName(userData)}
            </Text>
          </View>
        ) : null}
        {menus && menus.map((item, index) => renderItem(item, index))}

        {userData && (
          <TouchableOpacity
            style={[css.menuRowLogout, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={this._logout}>
            <Icon name="sign-out" size={14} color="#FFF" />
            <Text style={[css.logoutLink, this.props.textColor]}>
              {Languages.logout}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.data,
})
export default connect(
  mapStateToProps,
  { clearPosts, clearUserData }
)(SideMenu)
