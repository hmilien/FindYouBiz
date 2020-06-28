/** @format */

'use strict'
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Config, Constants, Images, Tools } from '@common';
import { CommentIcons, ImageCache, Rating } from '@components';

export default class List extends Component {
  render() {
    const { post, viewPost, hideBookmark, width } = this.props

    const { small } = Config.PostImage
    const imageURL =
      typeof post !== 'undefined'
        ? Tools.getImage(post, small, true)
        : Images.imageBase
    const title =
      typeof post !== 'undefined'
        ? Tools.formatText(post.title.rendered, 300)
        : ' '
    const description =
      typeof post !== 'undefined' ? Tools.getDescription(post.content, 300) : ' ';
    const rating = typeof post !== 'undefined' ? post.totalRate : 0;
    const reviewText = typeof post !== 'undefined' ? post.totalReview : '';
    const price = typeof post !== 'undefined' ? post.cost : '';

    if (typeof post !== 'undefined') {
      return (
        <View style={styles.panelList}>
          <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
            <ImageCache
              defaultSource={Images.imageHolder}
              source={{ uri: imageURL }}
              style={styles.imageList}
            />
            {!hideBookmark && (
              <CommentIcons
                post={post}
                size={16}
                style={[
                  styles.heart,
                  { right: Constants.RTL ? 10 : 0, top: 10 },
                ]}
                showLoveIcon
              />
            )}
          </TouchableOpacity>

          <View style={styles.titleList} onPress={viewPost}>
            <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
              <Text numberOfLines={1} style={styles.nameList}>
                {title}
              </Text>
              {price !== '' && (
                <Text
                  numberOfLines={2}
                  style={[styles.nameSub, width && { width: width - 4 }]}>
                  {price}
                </Text>
              )}
            </TouchableOpacity>

            <Text numberOfLines={2} style={styles.descriptionList}>
              {description}
            </Text>

            <View style={[styles.wrapRating, width && { width: width - 4 }]}>
              <View style={styles.ratingView}>
                <Rating value={rating} />
                <Text style={styles.countText}>{reviewText}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    return <View />
  }
}
