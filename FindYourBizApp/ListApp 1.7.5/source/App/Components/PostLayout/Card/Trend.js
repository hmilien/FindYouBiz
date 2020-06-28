/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import { Config, Images, Icons, AppConfig, Languages, Tools } from '@common'
import { CommentIcons, Rating, TouchableScale } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window')
import styles from './styles'

export default class CardTrend extends Component {
  render() {
    const {
      post,
      viewPost,
      hidePrice,
      hideBookmark,
      disabledCates,
    } = this.props
    const imageURL = Tools.getImage(post, Config.PostImage.large, true)
    const title = Tools.formatText(post.title.rendered)
    const location =
      typeof post.location !== 'undefined' && post.location != ''
        ? post.location
        : ''
    const price =
      typeof post != 'undefined'
        ? typeof post.cost != 'undefined' && post.cost != ''
          ? post.cost
          : ''
        : ''
    const rating = typeof post.totalRate != 'undefined' ? post.totalRate : ''

    const renderIcon = () => (
      <Icon.Button
        name={Icons.iconReadMore}
        color={Icons.iconReadMoreColor}
        size={Icons.iconReadMoreSize}
        style={styles.iconReadMore}
        backgroundColor={Icons.iconReadMoreBG}
      />
    )
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
              colors={['rgba(0,0,0,.5)', 'rgba(0,0,0, .2)', 'rgba(0,0,0,0)']}
              style={styles.cardTrendGradient}
            />
            <Image
              source={{ uri: imageURL }}
              defaultSource={Images.imageHolderBooking}
              style={styles.imagePanelTrend}
            />
            <View style={styles.cardTrendBottom}>
              <View>
                <Text style={[styles.readMore, { color: '#FFF' }]}>
                  {Languages.readMore}
                </Text>
              </View>
              {renderIcon()}
            </View>
            {!hidePrice && price != '' && (
              <View style={styles.wrapPriceRange}>
                <Text style={[styles.priceRange]}>{price}</Text>
              </View>
            )}
            {!hideBookmark && (
              <CommentIcons
                post={post}
                showLoveIcon
                size={20}
                style={[styles.fixHeart, { top: 1, right: 10 }]}
              />
            )}
          </TouchableScale>

          <View style={styles.blurOne}>
            <View style={styles.oneRow}>
              <View>
                <Text style={styles.nameTrend}>{title}</Text>
              </View>
              {rating !== '' && (
                <View style={styles.ratingView}>
                  <Rating maxStars={1} value={rating} size={9} />
                  <Text style={styles.countText}>{rating}</Text>
                </View>
              )}
            </View>
            {!disabledCates && (
              <Text
                numberOfLines={1}
                style={[styles.cate, { color: '#D0021B' }]}>
                {Tools.formatText(Tools.getCategory(post.categories))}
              </Text>
            )}
            {location !== '' && (
              <View
                style={{
                  marginRight: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'md-pin'}
                  color={AppConfig.MainColor.mainColorTheme}
                  size={16}
                  style={styles.iconFeature}
                />
                <Text numberOfLines={2} style={styles.nameLocation}>
                  {location}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }
    return <View />
  }
}
