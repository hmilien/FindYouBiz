import React, { Component } from 'react'
import { Dimensions } from 'react-native'

import { Tools, Images, Style, Languages, Constants } from '@common'
import { Videos } from '@container'
import { Menu } from '@navigation/Icons'
import { TabBarIcon } from '@components'

export default class VideoScreen extends Component {
  static navigationOptions = {
    title: Languages.video,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon icon={Images.icons.video} tintColor={tintColor} />
    ),
    headerLeft: Menu(),
  }

  render() {
    const { navigate, onBack } = this.props.navigation
    return (
      <Videos
        onBack={() => onBack()}
        onViewPost={(item, index, parentPosts) =>
          navigate('postDetail', { post: item, index, parentPosts })
        }
      />
    )
  }
}
