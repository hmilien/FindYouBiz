'use strict'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import css from './style'
import { Languages, Images } from '@common'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { logout } from '@redux/actions'
import { ImageCache } from '@components'

class SideMenuBackGround extends Component {
  render() {
    const { rowStyle, textColor } = this.props
    const { userData } = this.props
    const menus = userData
      ? this.props.menus.filter(item => item.route != 'login')
      : this.props.menus

    return (
      <ScrollView>
        <View style={[css.sideMenuWide, this.props.menuBody]}>
          <Image
            source={require('images/menubackground.png')}
            style={css.menuBg}
          />

          {userData && (
            <View style={css.profileCenter}>
              <Image
                style={css.avatarLeft}
                source={{
                  uri:
                    userData != null && typeof userData.picture != 'undefined'
                      ? userData.picture.data.url
                      : Images.person,
                }}
              />
              <Text style={[css.fullname, this.props.textColor]}>
                {userData.first_name + ' ' + userData.last_name}
              </Text>
              <Text style={[css.email, this.props.textColor]}>
                {userData.email}
              </Text>
            </View>
          )}

          <View style={{ marginTop: 20 }}>
            {menus.map((menu, index) => {
              return (
                <TouchableOpacity
                  style={[css.menuRowBlack, rowStyle]}
                  key={index}
                  onPress={menu.onPress}
                >
                  <Icon
                    name={menu.icon}
                    style={[css.icon, this.props.iconStyle]}
                  />
                  <Text style={[css.menuLink, textColor]}>{menu.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {userData && (
            <TouchableOpacity
              style={[css.menuRowLogout, rowStyle]}
              underlayColor="#2D2D30"
              onPress={this.logout}
            >
              <Text style={[css.logoutLink, textColor]}>
                {Languages.logout}
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
export default connect(mapStateToProps, { logout })(SideMenuBackGround)
