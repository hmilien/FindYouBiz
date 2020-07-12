/** @format */

import React, { Component } from 'react'

import { Images, Languages, Color, Styles } from '@common'
import { Menu } from './Icons'
import { TabBarIcon } from '@components'
import { MyBookings } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class MyBookingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.myBookings,
    // headerLeft: Menu(),
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        css={{ width: 20, height: 18 }}
        iconStatic={Images.icons.calendar}
        tintColor={tintColor}
      />
    ),
  })

  render() {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{flex: 1}}>
        <MyBookings
          navigation={this.props.navigation}
          onViewHomeScreen={() => navigate('home')}
        />
      </SafeAreaView>
    )
  }
}
