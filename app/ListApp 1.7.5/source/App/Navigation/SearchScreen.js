/** @format */

import React, { Component } from 'react'
import { Languages } from '@common'
import { Search } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class SearchScreen extends Component {
  static navigationOptions = {
    tabBarLabel: Languages.textBookMark,
    header: null,
  }

  render = () => {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{flex: 1}}>
        <Search
          onViewPost={(post, index) =>
            navigate('postDetail', {
              post,
              index,
              fromSearch: true,
              backToRoute: 'map',
            })
          }
          onViewMap={() => navigate('map')}
          onViewCategory={(item) =>
            navigate('category', { mainCategory: item, fromSearch: true })
          }
          onViewFilter={() => navigate('filter')}
        />
      </SafeAreaView>
      
    )
  }
}
