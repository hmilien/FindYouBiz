'use strict'
import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import css from './styles'
import { CommentIcons } from '@components'
import { warn, Tools } from '@common'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default class TwoColumn extends Component {
  render() {
    const { post, viewPost } = this.props
    const imageURL = Tools.getImage(post)
    const title = typeof post.title == 'undefined' ? '' : post.title.rendered

    const imageSize = Tools.getImageSize(post, SCREEN_WIDTH / 2)

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={css.viewMansory}
        onPress={viewPost}
      >
        <View style={css.cardView}>
          <Image
            style={[css.imageMansory, { height: imageSize.height }]}
            source={{ uri: imageURL }}
          />
          <View style={css.smDescription}>
            <Text style={css.smTitle}>{Tools.formatText(title)}</Text>
          </View>
        </View>
        <CommentIcons
          post={post}
          size={16}
          style={css.fixHeart}
          hideShareIcon
          hideOpenIcon
          hideCommentIcon
        />
      </TouchableOpacity>
    )
  }
}
