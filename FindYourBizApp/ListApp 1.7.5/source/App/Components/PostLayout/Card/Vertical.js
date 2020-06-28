/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { Config, Images, Tools } from '@common'
import { TouchableScale, CommentIcons, Rating } from '@components'
import Icon from '@expo/vector-icons/Ionicons'
import { LinearGradient } from '@expo'
const { width } = Dimensions.get('window')
import styles from './styles'

export default class CardVertical extends Component {
  render() {
    const {
      post,
      hideBookmark,
      viewPost,
      hidePrice,
      disabledCates,
    } = this.props
    const imageURL = Tools.getImage(post, Config.PostImage.full)
    const title = Tools.formatText(post.title.rendered)
    const price = typeof post != 'undefined' ? post.cost : ''
    const location =
      typeof post.location !== 'undefined' && post.location != ''
        ? post.location
        : ''
    const rating = typeof post !== 'undefined' ? post.totalRate : 0
    // const reviewText = typeof post !== 'undefined' ? post.totalReview : ''

    if (typeof post !== 'undefined') {
      return (
        <View>
          <TouchableScale
            activeOpacity={0.9}
            style={styles.panelTrend}
            onPress={viewPost}>
            <LinearGradient
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              colors={['rgba(0,0,0,.7)', 'rgba(0,0,0, .4)', 'rgba(0,0,0,0)']}
              style={[styles.verticalGradient]}
            />
            {location != '' && (
              <View style={styles.addressLeft}>
                <Icon
                  name={'md-pin'}
                  color={'#FFF'}
                  size={20}
                  style={styles.iconFeature}
                />
                <Text style={styles.locationText} numberOfLines={2}>
                  {location}
                </Text>
              </View>
            )}
            {!hideBookmark && (
              <CommentIcons
                post={post}
                showLoveIcon
                size={26}
                style={[styles.fixHeartVertical]}
              />
            )}
            <Image
              source={{ uri: Tools.getProductImage(imageURL, width) }}
              defaultSource={Images.imageHolderBooking}
              style={styles.imageCardVertical}
            />

            <View style={styles.blurOneVertical}>
              <Text style={[styles.nameTrend, styles.nameTrendVertical]}>
                {title}
              </Text>
              {rating != 0 && (
                <View style={styles.ratingViewVertical}>
                  <Rating
                    maxStars={5}
                    marginLeft={7}
                    colorStar={'rgba(255, 149, 0, 1)'}
                    value={rating}
                    size={16}
                  />
                </View>
              )}
              {!disabledCates && (
                <Text
                  numberOfLines={1}
                  style={[styles.cate, { color: '#D0021B' }]}>
                  {Tools.getCategory(post.categories)}
                </Text>
              )}
            </View>
            {!hidePrice && price != '' && typeof price == 'string' && (
              <View style={[styles.wrapPriceRange, styles.priceVertical]}>
                <Text style={[styles.priceRange, styles.priceRangeVertical]}>
                  {price}
                </Text>
              </View>
            )}
          </TouchableScale>
        </View>
      )
    }
    return <View />
  }
}
