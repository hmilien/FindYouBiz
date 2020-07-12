/** @format */

import React, { Component } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { fetchPostsByTerm } from '@redux/actions'
import { Constants, Tools, Config, Images, Layout, warn } from '@common'
import { connect } from 'react-redux'
import styles from './styles'
import MasonryList from '@appandflow/masonry-list'
const { width: SCREEN_WIDTH } = Dimensions.get('window')
import MansoryRow from './MansoryRow'
import { Layer } from '@navigation/Icons'
import {
  PostLayout,
  AnimatedHeader,
  HeaderFilter,
  Toolbar,
  FlatButton,
  LogoSpinner,
  Spinkit,
} from '@components'
const AnimatedListView = Animated.createAnimatedComponent(MasonryList)

class Mansory extends Component {
  state = { scrollY: new Animated.Value(0) }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false

    const scrollY = new Animated.Value(0)
    this.state = { scrollY }
  }

  componentDidMount() {
    this.fetchPost()
  }

  onViewPost(item, index) {
    this.props.onViewPost(item, index)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list
  }

  renderItem = ({ item, index }) => {
    if (item === null) return <View />

    return (
      <MansoryRow
        post={item}
        viewPost={this.onViewPost.bind(this, item, index)}
      />
    )
  }

  fetchPost = (reload = false) => {
    if (reload) {
      this.page = 1
    }
    const { fetchPostsByTerm } = this.props
    fetchPostsByTerm(this.page)
  }

  nextPosts = () => {
    if (!this.props.postFinish) {
      this.isNextPost = true
      this.page += 1
      this.fetchPost()
    }
  }

  render() {
    const { list, isFetching } = this.props

    return (
      <View style={styles.body}>
        <AnimatedHeader  scrollY={this.state.scrollY} />

        <AnimatedListView
          contentContainerStyle={styles.listView}
          onRefresh={() => this.fetchPost(true)}
          refreshing={isFetching}
          data={list}
          renderItem={this.renderItem}
          getHeightForItem={({ item }) =>
            Tools.getImageSize(item, SCREEN_WIDTH / 2).height
          }
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={(distance) => {
            distance.distanceFromEnd < 700 && this.nextPosts()
          }}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ posts, tags, categories }, ownProps) => {
  return {
    list: posts.list,
    postFinish: posts.postFinish,
    isFetching: posts.isFetching,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
    layout: posts.layout,
    parentLayout: ownProps.layout,
  }
}
export default connect(mapStateToProps, { fetchPostsByTerm })(Mansory)
