/** @format */

import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native'
import flatten from 'lodash/flatten'
import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'
import { Tools, Languages, Images, AppConfig } from '@common'
import styles from './styles'
import Carousel from 'react-native-snap-carousel'
import { LinearGradient } from '@expo'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideWidth = wp(75)
const slideHeight = viewportHeight * 0.65
const itemHorizontalMargin = wp(2)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2

const slideInnerContainer = {
  width: itemWidth,
  height: slideHeight,
  borderRadius: 6,
  overflow: 'hidden',
  paddingHorizontal: itemHorizontalMargin,
  paddingBottom: 18, // needed for shadow
}

class CategoryCarousel extends Component {
  showCategory = (category) => {
    const { setActiveCategory, onViewCategory } = this.props
    setActiveCategory(category.id)
    onViewCategory(category)
  }

  renderItem = ({ item, index }) => {
    // optimize image
    let cateImage = "";
    if (item.image && item.image[0]) {
      let temp = item.image[0].file
      cateImage = temp ? `${AppConfig.Website.url}/wp-content/uploads/${temp}` : "";
    } else {
      cateImage = Images.imageBase;
    }

    return (
      <View style={slideInnerContainer} key={index}>
        <LinearGradient
          style={[styles.linearGradient, { width: itemWidth }]}
          colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.8)']}
        />
        <Image
          defaultSource={Images.imageHolder}
          source={{ uri: cateImage }}
          style={styles.image}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.showCategory(item)}
          style={styles.titleView}>
          <Text style={styles.title}>
            {Tools.getDescription(item.name, 200)}
          </Text>
          <Text numberOfLines={2} style={styles.count}>
            {item.count + ' ' + Languages.placeToVisit}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { categories } = this.props

    return (
      <Carousel
        layout={'stack'}
        layoutCardOffset={18}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideOpacity={0.4}
        contentContainerCustomStyle={styles.sliderContainer}
        removeClippedSubviews={false}
        loop={true}
        data={categories}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const categories = flatten(state.categories.list)
  return { categories }
}
export default connect(
  mapStateToProps,
  {
    fetchCategories,
    fetchPosts,
    setActiveCategory,
  }
)(CategoryCarousel)
