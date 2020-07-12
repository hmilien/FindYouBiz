/** @format */

import React, { Component } from 'react'
import Theme from '@theme';
import { SafeAreaView } from 'react-navigation';

export default class PostNewListingScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={{flex: 1}}>
        <Theme.PostNewListing
          onBack={() => navigation.goBack(null)}
          next={(post) => navigation.navigate('pickMap', { post })}
        />
      </SafeAreaView>
      
    )
  }
}
