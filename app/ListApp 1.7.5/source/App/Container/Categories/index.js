/** @format */

import React, { Component } from 'react'
import {
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native'

import { connect } from 'react-redux'
import { Color, Tools, Config, Languages, AppConfig, Images } from '@common'
import { CategoryCarousel, AnimatedHeader, TouchableScale } from '@components'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'

const size = Config.PostImage.large
class Categories extends Component {
  constructor(props) {
    super(props)
    this.page = 1
    this.state = {
      scrollY: new Animated.Value(0),
    }
    this.defaultCates = [
      { image: Images.imageBase, name: 'Category...', count: 'Updating...' },
      { image: Images.imageBase, name: 'Category...', count: 'Updating...' },
      { image: Images.imageBase, name: 'Category...', count: 'Updating...' },
    ]
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  componentWillReceiveProps(nextProps) {
    return (
      this.props.selectedLayout != nextProps.selectedLayout ||
      this.props.categories != nextProps.categories
    )
  }

  showCategory = (category) => {
    const { setActiveCategory, onViewCategory } = this.props
    setActiveCategory(category.id)
    onViewCategory(category)
  }

  changeLayout = () => this.props.setActiveLayout(!this.props.selectedLayout)

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  nextCategories = () => {
    this.page += 1
    this.props.fetchCategories(this.page)
  }

  _renderItem = (category, index) => {
    let cateImage
    if (category.count > 0) {
      if (
        category.image &&
        category.image.length > 0 &&
        category.image != null
      ) {
        // optimize image
        let temp = category.image[0].file
        temp = temp.substring(temp.indexOf('.'), 0)
        let tag = category.image[0].file.split('.').pop()
        cateImage = `${
          AppConfig.Website.url
        }/wp-content/uploads/${temp}-${size}.${tag}`
      }
      return (
        <TouchableScale
          key={index.toString()}
          style={[styles.containerStyle]}
          onPress={() => this.showCategory(category)}>
          <View style={[styles.borderView]}>
            <Image
              style={styles.image}
              source={{ uri: cateImage }}
              defaultSource={Images.imageHolder}
            />
            <View
              style={[
                styles.dim_layout,
                { alignItems: index % 2 == 0 ? 'flex-end' : 'flex-start' },
              ]}>
              <Text style={[styles.mainCategoryText]}>
                {Tools.getDescription(category.name, 200)}
              </Text>
              <Text numberOfLines={2} style={styles.count}>
                {category.count + ' ' + Languages.placeToVisit}
              </Text>
            </View>
          </View>
        </TouchableScale>
      )
    }
    return <View />
  }

  renderContent = () => {
    const {
      categories,
      isFetching,
      onViewCategory,
      selectedLayout,
    } = this.props

    if (isFetching) {
      return (
        <View style={[styles.horizontalLoading]}>
          <ActivityIndicator size="small" color="#00ff00" />
        </View>
      )
    }

    if (selectedLayout !== Config.CategoryListView) {
      return <CategoryCarousel onViewCategory={onViewCategory} />
    }
    const filterCategories =
      typeof categories != 'undefined' ? categories : this.defaultCates

    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <ScrollView
          style={styles.body}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
          onEndReached={(e) => {
            e.distanceFromEnd > 500 && this.nextCategories()
          }}>
          {filterCategories.map((category, index) => {
            if (category.name == 'Uncategorized')
              return <View key={index.toString()} />

            return this._renderItem(category, index)
          })}
        </ScrollView>
      </View>
    )
  }

  renderLayoutButton = () => {
    const hitSlop = { top: 20, right: 20, left: 20, bottom: 20 }
    return (
      <TouchableOpacity
        style={styles.fab}
        onPress={this.changeLayout}
        activeOpacity={0}
        hitSlop={hitSlop}>
        <Icon.Button
          onPress={this.changeLayout}
          color={Color.backButton.text}
          iconStyle={{ backgroundColor: 'transparent', left: 5 }}
          borderRadius={50}
          backgroundColor={'transparent'}
          name={'exchange'}
          size={14}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AnimatedHeader
          isCategory
          scrollY={this.state.scrollY}
          label={Languages.category}
        />
        {this.renderContent()}
        {this.renderLayoutButton()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const categories = state.categories.list
  const selectedLayout = state.categories.selectedLayout
  const isFetching = state.categories.isFetching
  return { categories, selectedLayout, isFetching }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchCategories,
    setActiveCategory,
    setActiveLayout,
  } = require('@redux/actions')
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    setActiveCategory: (id) => dispatch(setActiveCategory(id)),
    setActiveLayout: (enable) => dispatch(setActiveLayout(enable)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
