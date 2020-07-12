/** @format */

import React, { Component } from 'react'

import { Languages, } from '@common'
import { Setting } from '@container'
import { Menu } from '@navigation/Icons';
import { SafeAreaView } from 'react-navigation';

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.setting,
    headerLeft: Menu()
  })

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Setting navigation={this.props.navigation}/>
      </SafeAreaView>
        
    )
  }
}