/** @format */

'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import DropdownAlert from 'react-native-dropdownalert'
import styles from './style'
import { SignIn, SignUp } from '@container'
import { Color, Languages, Constants, Images, Events } from '@common'

export default class LogIn extends Component {
  componentWillMount() {
    Events.onLoginShowError(this.showError.bind(this))
  }

  showError(message) {
    this.dropdown && this.dropdown.alertWithType('error', 'Error', message)
  }

  render() {
    const { onHome, onDetail, fromDetail } = this.props
    return (
      <View style={styles.body}>
        <ScrollableTabView
          initialPage={0}
          locked={false}
          tabBarUnderlineStyle={styles.activeTab}
          tabBarActiveTextColor={Color.tabbarTint}
          tabBarInactiveTextColor={'#ddd'}
          tabBarTextStyle={styles.textTab}
          renderTabBar={() => (
            <ScrollableTabBar
              underlineHeight={0}
              style={{ borderBottomColor: 'transparent' }}
              tabsContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              tabStyle={styles.tab}
            />
          )}>
          {Constants.RTL ? (
            <SignUp
              onDetail={onDetail}
              fromDetail={fromDetail}
              onHome={onHome}
              tabLabel={Languages.signup}
            />
          ) : (
            <SignIn
              onDetail={onDetail}
              fromDetail={fromDetail}
              onHome={onHome}
              tabLabel={Languages.login}
            />
          )}

          {Constants.RTL ? (
            <SignIn
              onDetail={onDetail}
              fromDetail={fromDetail}
              onHome={() => onHome}
              tabLabel={Languages.login}
            />
          ) : (
            <SignUp
              onDetail={onDetail}
              fromDetail={fromDetail}
              onHome={() => onHome}
              tabLabel={Languages.signup}
            />
          )}
        </ScrollableTabView>

        <DropdownAlert ref={(ref) => (this.dropdown = ref)} />
      </View>
    )
  }
}
