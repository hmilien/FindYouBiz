'use strict'
import React, { Component } from 'react'
import { View, TouchableOpacity, WebView } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { ImageCache } from '@components'
import css from './styles'
import { warn, Images } from '@common'

export default class Video extends Component {
  state = { played: false }

  playVideo = () => {
    this.setState({ played: true })
  }

  render() {
    const { imageURL, videoUrl, style } = this.props
    const { played } = this.state

    if (!played && typeof imageURL != 'undefined') {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={style}
          onPress={this.playVideo}
        >
          <ImageCache source={{ uri: imageURL }} style={css.imageBox} />
          <View style={css.iconVideo}>
            <Icon name="control-play" size={25} style={css.iconPlay} />
          </View>
        </TouchableOpacity>
      )
    } else if (played) {
      return (
        <WebView
          style={style ? style : null}
          source={{ uri: videoUrl }}
          scrollEnabled={false}
        />
      )
    }
  }
}
