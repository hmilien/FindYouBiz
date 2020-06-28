/** @format */

import React, { Component } from 'react';
import { Categories } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class CategoriesScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{flex: 1}}>
        <Categories
          showBanner
          onViewPost={(post, index) => navigate('postDetail', { post, index })}
          onViewCategory={(item) => navigate('category', { mainCategory: item })}
        />
      </SafeAreaView>
    )
  }
}
