/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Config, Constants, Images, Color, Tools } from '@common'
import { CommentIcons, ImageCache, Rating } from '@components'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class ListRight extends Component {
  render() {
    const { viewPost, width, post } = this.props
    const imageURL =
      typeof post != 'undefined'
        ? Tools.getImage(post, Config.PostImage.small)
        : Images.imageBase
    const title =
      typeof post != 'undefined'
        ? Tools.formatText(post.title.rendered, 100)
        : ''
    const description =
      typeof post != 'undefined' ? Tools.getDescription(post.excerpt, 300) : ''
    const rating = typeof post != 'undefined' ? post.totalRate : ''
    const reviewText = typeof post != 'undefined' ? post.totalReview : ''
    const price = typeof post != 'undefined' ? post.cost : ''

    let videoUrl = ' '
    if (typeof post !== 'undefined') {
      videoUrl = Tools.getLinkVideo(post.content)

      return (
        <View style={styles.panel}>
          <View style={styles.content}>
            <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
              <Text numberOfLines={2} style={styles.title}>
                {title}
              </Text>
            </TouchableOpacity>
            {price != '' && (
              <Text
                numberOfLines={2}
                style={[styles.nameSub, width && { width: width - 4 }]}>
                {price}
              </Text>
            )}
            <Text numberOfLines={2} style={styles.description}>
              {description}
            </Text>

            <View style={[styles.wrapRating, width && { width: width - 4 }]}>
              <View style={styles.ratingView}>
                <Rating value={rating} />
                <Text style={styles.countText}>{reviewText}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
            {videoUrl.length > 0 && (
              <View style={styles.iconVideo}>
                <Icon name="control-play" size={18} style={styles.iconPlay} />
              </View>
            )}
            <ImageCache source={{ uri: imageURL }} style={styles.image} />
          </TouchableOpacity>

          <CommentIcons
            post={post}
            size={16}
            color={Color.main}
            style={[styles.heart, { right: Constants.RTL ? 10 : 0, top: 10 }]}
            showLoveIcon
          />
        </View>
      )
    }
    return <View />
  }
}
