/** @format */

import React, { Component } from 'react'
import { Home } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  render() {
    const { navigate, goBack } = this.props.navigation
    return (
      <Home
        onViewPost={(post, index, indexHomeLayout, component, list) => {
          navigate('postDetail', {
            post,
            index,
            indexHomeLayout,
            component,
            list,
            backToRoute: 'home',
            fromSearch: false,
          })
        }}
        onShowAll={({ index, config }) =>
          navigate('horizontalScreen', { config, index })
        }
        goBack={() => goBack()}
        onViewMap={() => navigate('map')}
        onViewSearch={() => navigate('search')}
        onViewCategory={(item) => navigate('category', { mainCategory: item })}
      />
    )
  }
}
