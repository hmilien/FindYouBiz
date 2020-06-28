/** @format */

import React, { Component } from 'react'

import { Tools } from '@common'
import { Category } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false,
  })

  render() {
    const { navigate, getParam, goBack, state } = this.props.navigation

    const cateName =
      typeof state.params.mainCategory.name != 'undefined'
        ? Tools.getDescription(state.params.mainCategory.name, 200)
        : ' '

    const fromSearch = getParam('fromSearch', false)

    // console.warn(state.params)
    return (
      <SafeAreaView style={{flex: 1}}>
        <Category
          mainCategory={state.params.mainCategory}
          goBack={() => goBack()}
          cateName={cateName}
          onViewPost={(post, index) =>
            navigate('postDetail', {
              post,
              index,
              backToRoute: 'categories',
              fromSearch,
            })
          }
        />
      </SafeAreaView>
      
    )
  }
}
