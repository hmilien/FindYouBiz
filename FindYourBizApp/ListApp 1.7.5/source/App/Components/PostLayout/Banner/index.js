/** @format */

'use strict'
import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Config, Images, Tools } from '@common'
import { ImageCache } from '@components'
import { LinearGradient } from '@expo'

export default class BannerLayout extends Component {
  render() {
    const { post, viewPost } = this.props
    const imageURL = Tools.getImage(post, Config.PostImage.large, true)

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={viewPost}
        key={post.id}
        style={styles.bannerWrapper}>
        <View style={styles.bannerView} key={'postBanner-' + post.id}>
          <ImageCache
            defaultSource={Images.imageHolder}
            style={styles.bannerImage}
            source={{ uri: imageURL }}
          />
          <LinearGradient
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(255,255,255,0)',
              'rgba(255,255,255,.2)',
            ]}
            style={styles.bannerGradient}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
