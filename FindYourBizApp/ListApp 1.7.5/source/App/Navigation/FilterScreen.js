/** @format */

import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation';
import Theme from '@theme'

export default class FilterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme.Filter />
      </SafeAreaView>
    )
  }
}
