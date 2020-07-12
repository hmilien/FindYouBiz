/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import styles from './styles'
import { Config, Tools } from '@common'
import { CommentIcons, ImageCache, Rating } from '@components'
const { width } = Dimensions.get('window')

export default class ReadMoreLayout extends Component {
  render() {
    const { post, viewPost, imageSize } = this.props

    const imageURL = Tools.getImage(post, Config.PostImage.small, true)

    const title = Tools.formatText(post.title.rendered, 300)
    const description = Tools.getDescription(
      post.type === 'job_listing' ? post.content : post.excerpt,
      100
    )
    const rating = post.totalRate
    const reviewText =
      post.totalReview === 0 || post.totalReview === undefined
        ? ' '
        : post.totalReview + ' Reviews'

    return (
      <View style={styles.panelList}>
        <CommentIcons
          post={post}
          size={16}
          style={[styles.fixHeart, { width: 40, top: 13, left: 10 }]}
          hideShareIcon
          hideOpenIcon
          hideKnifeIcon
          hidePhoneIcon
          hideCommentIcon
        />

        <TouchableOpacity onPress={viewPost}>
          <ImageCache source={{ uri: imageURL }} style={styles.imageList} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleList} onPress={viewPost}>
          <Text style={styles.nameList}>{title}</Text>

          <Text style={styles.descriptionList}>{description}</Text>

          <View style={[styles.wrapRating, width && { width: width - 4 }]}>
            <View style={styles.ratingView}>
              <Rating value={rating} />
              <Text style={styles.countText}>{reviewText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
