/** @format */

import React, { Component } from 'react'
import { View } from 'react-native'
import { LogIn } from '@container'
import { Toolbar } from '@components';
import { SafeAreaView } from 'react-navigation';

export default class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  render() {
    const { getParam, navigate } = this.props.navigation
    const fromDetail = getParam('fromDetail', undefined)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Toolbar />
        <LogIn
          onHome={() => navigate('home')}
          onDetail={() => navigate('postDetail')}
          fromDetail={fromDetail}
        />
      </SafeAreaView>
    )
  }
}
