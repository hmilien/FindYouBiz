/** @format */

import React, { Component } from 'react'
import { PickMap } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class PickMapScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props
    const { navigate } = navigation

    return (
      <SafeAreaView style={{flex: 1}}>
        <PickMap
          navigation={navigation}
          onBack={() => navigation.goBack()}
          onClose={() => navigate('userProfile')}
          next={(post, pickMap) => navigate('postNewContent', { post, pickMap })}
        />
      </SafeAreaView>
      
    )
  }
}
