/** @format */

import React, { Component } from 'react'

import { Images, Languages } from '@common'
import { TabBarIcon } from '@components'
import { Back } from './Icons'
import { MyListings } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class MyListingssScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: Languages.myListings,
    headerLeft: Back(() => navigation.goBack(), Images.icons.LongBack, '#000'),
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        css={{ width: 20, height: 18 }}
        iconStatic={Images.icons.calendar}
        tintColor={tintColor}
      />
    ),
  })

  render() {
    const { navigate, goBack } = this.props.navigation
    return (
      <SafeAreaView style={{flex: 1}}>
        <MyListings
          navigation={this.props.navigation}
          onViewHomeScreen={() => navigate('home')}
          onBack={() => goBack()}
          onViewPost={(post, index) => {
            navigate('postDetail', {
              post,
              index,
            })
          }}
        />
      </SafeAreaView>
      
    )
  }
}
