/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import css from './styles'
import { Config, Images, Tools } from '@common'
import { CommentIcons, ImageCache } from '@components'
import { LinearGradient } from '@expo'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class CardLayout extends PureComponent {
  render() {
    const { viewPost, hideTitle, post } = this.props
    const imageURL = Tools.getImage(post, Config.PostImage.large, true)
    const title =
      post && post.title ? Tools.formatText(post.title.rendered) : ''
    let videoUrl = ' '
    if (typeof post.content !== 'undefined') {
      videoUrl = Tools.getLinkVideo(post.content)
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.panelOne}
        onPress={viewPost}>
        <ImageCache
          defaultSource={Images.imageHolder}
          source={{ uri: imageURL }}
          style={css.imagePanelOne}
        />

        {videoUrl.length > 0 && (
          <View style={css.iconVideo}>
            <Icon name="control-play" size={25} style={css.iconPlay} />
          </View>
        )}

        {hideTitle && (
          <LinearGradient
            style={css.linearGradient}
            colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.8)']}
          />
        )}

        <Text style={[css.nameOne, hideTitle && css.floatTitle]}>{title}</Text>
        <CommentIcons
          post={post}
          size={20}
          style={css.heart}
          showLoveIcon
          activeBackground="rgba(255, 255, 255, .3)"
        />
      </TouchableOpacity>
    )
  }
}
