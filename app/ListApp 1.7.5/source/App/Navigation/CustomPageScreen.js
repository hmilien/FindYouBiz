/** @format */

import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import { Menu } from './Icons'
import { Constants } from '@common'
import { CustomPage } from '@container'
import { Toolbar } from '@components'
import { SafeAreaView } from 'react-navigation';

export default class CustomPageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      typeof navigation.state.params != 'undefined'
        ? navigation.state.params.title
        : '',
    headerLeft: Constants.RTL ? null : Menu(),
    headerRight: Constants.RTL ? Menu() : null,
  })

  render() {
    const { state } = this.props.navigation
    const { url, id } = state.params

    if (typeof state.params === 'undefined') {
      return <View />
    }

    if (typeof url !== 'undefined' && url.length > 0) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Toolbar />
          <WebView source={{ uri: url }} />
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomPage id={id} />
      </SafeAreaView>
    )
  }
}
