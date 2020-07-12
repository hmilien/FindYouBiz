import React, { Component } from 'react'
import { ScrollView, Platform, Animated, View, Dimensions } from 'react-native'
import flatten from 'lodash/flatten'

import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'

import { Color, Constants, warn } from '@common'
import { PostList, HeaderFilter, LogoSpinner, Modal } from '@components'

import styles from './styles'
import Category from './Category'

const PAGE_HEIGHT = Dimensions.get('window').height
const BANNER_HEIGHT = PAGE_HEIGHT * 12 / 100

class CategoryList extends Component {
  state = {
    scrollY: new Animated.Value(0),
    androidColor: '#fff',
  }

  constructor(props) {
    super(props)
    props.selectedCategory == 0
    this.onScroll = this.onScroll.bind(this)
    this.categoryRef = null
  }

  onShowCategory() {
    // Animated.spring(this.state.animateContent, {toValue: PAGE_HEIGHT, duration: duration}).start();
    this.props.setActiveCategory(null)
    this.categoryRef.revertAnimate()
  }

  // close current category item and back to main page
  onScroll(event) {
    if (event.nativeEvent.contentOffset.y < -PAGE_HEIGHT * 10 / 100) {
      this.onShowCategory()
    }
  }

  // calback from child element
  onPressItem = (id, ref) => {
    this.props.setActiveCategory(id)
    this.props.fetchPosts(1, null, id)
    this.categoryRef = ref
    this.setState({ androidColor: ref.props.color })
  }

  componentWillMount() {
    if (this.props.categories.length == 0) {
      this.props.fetchCategories()
    }
  }

  render() {
    const { categories } = this.props

    const renderListView = () => {
      return (
        <ScrollView
          style={[styles.content]}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
        >
          <View
            style={{
              height: BANNER_HEIGHT,
              backgroundColor:
                Platform.OS == 'android'
                  ? this.state.androidColor
                  : 'transparent',
            }}
          />

          <HeaderFilter
            showCategory={true}
            onShowContent={this.onShowCategory.bind(this)}
          />
          <PostList
            enableLoading
            layout={Constants.Layout.threeColumn}
            onViewPost={this.props.onViewPost}
          />
        </ScrollView>
      )
    }

    const renderRow = (item, index) => {
      const isShow =
        this.props.selectedCategory == null ||
        this.props.selectedCategory == item.id
          ? 1
          : 0
      if (isShow) {
        return (
          <Category
            key={'cate' + index}
            color={Color.colors[index % 12]}
            selectedCategory={this.props.selectedCategory}
            onPressItem={this.onPressItem.bind(this)}
            category={item}
          />
        )
      }
      return <View key={'cate' + index} style={styles.boxCategory} />
    }

    return (
      <ScrollView style={styles.fill}>
        <View style={styles.flatlist}>
          {categories.map((category, index) => renderRow(category, index))}
          {this.props.selectedCategory != null && renderListView()}
        </View>

        <Modal.Layout key={'LayoutCategory'} />
        <Modal.Tag key={'TagCategory'} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const selectedCategory = state.categories.selectedCategory
  const categories = flatten(state.categories.list)

  return { categories, selectedCategory }
}
export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  setActiveCategory,
})(CategoryList)
