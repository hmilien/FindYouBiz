/** @format */

'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import css from './styles'
import { CommentIcons, ImageCache, Rating } from '@components'
import { Tools, Images, Config } from '@common'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class ColumnLayout extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    width: 300,
    height: 80,
  }

  render() {
    const {
      viewPost,
      post,
      hidePrice,
      hideTagLine,
      hideBookmark,
      style,
      width,
      height,
      isMap,
      disabledCates,
      textColor,
    } = this.props

    let title = post && post.title ? Tools.formatText(post.title.rendered) : ''
    const imageURL = Tools.getImage(post, Config.PostImage.small, true)
    const rating = typeof post !== 'undefined' ? post.totalRate : 0
    const reviewText = typeof post !== 'undefined' ? post.totalReview : ''
    const price = typeof post != 'undefined' ? post.cost : ''
    let videoUrl = ''

    if (typeof post !== 'undefined') {
      videoUrl = Tools.getLinkVideo(post.content)

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[css.panel, style && style, width && { width: width + 15 }]}
          onPress={viewPost}>
          <View>
            <ImageCache
              defaultSource={Images.imageHolder}
              source={{ uri: imageURL }}
              style={[css.image, { width, height }]}
            />
            {!hidePrice && price !== '' && typeof price === 'string' && (
              <View style={css.wrapPrice}>
                <Text style={[css.price]}>{price}</Text>
              </View>
            )}
            {rating !== 0 && (
              <View style={css.ratingView}>
                <Rating value={rating} maxStars={1} size={9} />
                <Text style={css.countText}>{reviewText}</Text>
              </View>
            )}
          </View>

          {videoUrl.length > 0 && (
            <View
              style={[
                css.iconVideo,
                { left: width / 2 - 10 },
                { top: height / 3 },
              ]}>
              <Icon name="control-play" size={25} style={css.iconPlay} />
            </View>
          )}
          {!disabledCates && post.categories && (
            <Text
              numberOfLines={1}
              style={[
                css.name,
                { width: width - 4 },
                { color: textColor ? textColor : '#D0021B', fontSize: 12 },
              ]}>
              {Tools.formatText(Tools.getCategory(post.categories))}
            </Text>
          )}

          {title !== '' && (
            <Text
              numberOfLines={1}
              style={[
                css.name,
                { width: width - 4 },
                textColor && { color: textColor },
              ]}>
              {title}
            </Text>
          )}

          {!hideTagLine && (
            <Text
              numberOfLines={2}
              style={[
                css.nameSub,
                { width: width - 4 },
                textColor && { color: textColor },
              ]}>
              {typeof post !== 'undefined' && post.company_tagline}
            </Text>
          )}

          <View
            style={[
              css.wrapRating,
              hidePrice && { marginTop: 0 },
              { width: width - 4 },
            ]}>
            {isMap &&
              typeof post.distance !== 'undefined' &&
              post.distance !== '' && (
                <View style={css.wrapDisc}>
                  <Text style={css.distance}>{post.distance + 'm'}</Text>
                </View>
              )}
          </View>

          {!hideBookmark && (
            <CommentIcons
              post={post}
              showLoveIcon
              size={20}
              style={[css.fixHeart, { top: 1, right: 0 }]}
            />
          )}
        </TouchableOpacity>
      )
    }
    return <View />
  }
}
