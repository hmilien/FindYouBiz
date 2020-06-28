/** @format */

import React, { PureComponent } from 'react'
import { View, TouchableHighlight, Image } from 'react-native'
import css from './styles'
import CommentIcons from '@components/CommentIcons'
import { Tools, Config, Events } from '@common'
import { ImageCache } from '@components'

export default class Photo extends PureComponent {
  openPhoto = (post, index) =>
    Events.openPhotoClick({ post, index, isMedia: true })

  render() {
    const { photo, index } = this.props
    const imageURL = Tools.getImage(photo, Config.PostImage.medium)

    return (
      <View style={css.boxPhoto}>
        <TouchableHighlight
          underlayColor="white"
          style={css.boxWrapImage}
          onPress={() => this.openPhoto(photo, index)}>
          <ImageCache source={{ uri: imageURL }} style={css.boxImage} />
        </TouchableHighlight>

        <CommentIcons
          post={this.props.photo}
          style={css.shareIcons}
          hideShareIcon
          hideCommentIcon
          hideKnifeIcon
          hidePhoneIcon
          hideOpenIcon
          color="#FFFFFF"
        />
      </View>
    )
  }
}
