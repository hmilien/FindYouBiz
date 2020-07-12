import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import styles, { sliderWidth, itemWidth } from './styles'
import { Images, Config, Tools, AppConfig, Languages } from '@common'

import {
  fetchPostsByTerm,
  fetchCategories,
  setActiveCategory,
} from '@redux/actions'
import { connect } from 'react-redux'

class CategoryBanner extends Component {
  showCategory = categoryId => {
    const { setActiveCategory, fetchPostsByTerm } = this.props

    setActiveCategory(categoryId)
    fetchPostsByTerm(1, categoryId)
  }

  onViewItem = index => {
    const { list, fetchPostsByTerm, setActiveCategory } = this.props
    const category = list[index]

    if (typeof category != 'undefined') {
      setActiveCategory(category.id)
      fetchPostsByTerm(1, category.id)
    } else {
      setActiveCategory(null)
      fetchPostsByTerm(1, null)
    }
  }

  renderCategory = (category, index) => {
    return (
      <TouchableOpacity
        style={[styles.slideInnerContainer]}
        key={`cate-${index + 1}`}
        onPress={() => this.showCategory(category.id)}
      >
        <Text style={[styles.title]}>
          {Tools.getDescription(category.name.toUpperCase())}
        </Text>
        <View style={styles.imageContainer}>
          {index == 0 ? (
            <Image
              source={Images.imageCategories[category.slug]}
              style={styles.image}
            />
          ) : (
            <Image
              source={{
                uri: category.image
                  ? AppConfig.Website.url +
                    '/wp-content/uploads/' +
                    category.image[0].file
                  : Images.imageHolder,
              }}
              style={styles.image}
              defaultSource={Images.imageHolder}
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    const { fetchCategories } = this.props
    fetchCategories()
    // this.refs.carousel.snapToItem(0);
  }

  render() {
    const { list } = this.props
    return (
      <Carousel
        ref={'carousel'}
        onSnapToItem={this.onViewItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.6}
        enableMomentum={false}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid
        removeClippedSubviews={false}
        data={list}
        renderItem={({ item, index }) => this.renderCategory(item, index)}
      />
    )
  }
}

const mapStateToProps = ({ categories }) => {
  const data = [
    { id: null, name: Languages.allCategory, slug: 'all' },
    ...categories.list,
  ]
  return {
    list: data,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(mapStateToProps, {
  fetchPostsByTerm,
  fetchCategories,
  setActiveCategory,
})(CategoryBanner)
