/** @format */

import React, { Component } from 'react'
import Theme from '@theme';
import { SafeAreaView } from 'react-navigation';

export default class PostNewContentScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props
    const { navigate } = navigation

    return (
      <SafeAreaView style={{flex: 1}}>
        <Theme.PostNewContent
          navigation={navigation}
          onBack={() => navigation.goBack()}
          onClose={() => navigate('userProfile')}
        />
      </SafeAreaView>
      
    )
  }
}
