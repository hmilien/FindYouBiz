/** @format */

import React, { Component } from 'react'
import { Images } from '@common'
import { HorizonList, TabBarIcon } from '@components';
import { SafeAreaView } from 'react-navigation';

export default class HorizontalScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon iconStatic={Images.icons.homeListing} tintColor={tintColor} />
    ),
  })

  render() {
    const { navigate, goBack, state } = this.props.navigation
    const params = state.params
    const index = params.index
    let isFromHome = params.isFromHome
    return (
      <SafeAreaView style={{flex: 1}}>
        <HorizonList
          horizontal={false}
          key={`hlist-${index}`}
          config={{ ...params.config, isFromHome }}
          index={index}
          isFromHome
          goBack={() => goBack()}
          onViewPost={(post, index, indexHomeLayout, component) => {
            navigate('postDetail', { post, index, indexHomeLayout, component })
          }}
        />
      </SafeAreaView>
      
    )
  }
}
