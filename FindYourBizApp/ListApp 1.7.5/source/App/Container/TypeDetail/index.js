'use strict'
import React, { Component } from 'react'
import { View, Animated, FlatList } from 'react-native'

import { connect } from 'react-redux';
import { fetchPosts } from '@redux/actions'

import { warn, Constants, Config, Style, Languages } from '@common'
import {
  CommentIcons,
  TagList,
  TagLayout,
  FlatButton,
  Spinkit,
  BrowseLocation,
} from '@components'
import styles from './styles'

const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT

class TypeDetail extends Component {
  state = { scrollY: new Animated.Value(0) }

  constructor(props) {
    super(props)
    this.page = 1
  }

  fetchPost = () => {
    const { fetchPosts, type, index } = this.props
    fetchPosts(this.page, type.type, null, index)
  }

  nextPosts = () => {
    this.isNextPost = true
    this.page += 1
    this.fetchPost()
  }

  onViewPost(item, index) {
    this.props.onViewPost(item, index)
  }

  renderItem = ({ item, index }) => {
    let layout = Config.Type.Layout
    if (item == null) return <View key={'post_'} />
    return (
      <TagLayout
        post={item}
        key={'post-' + index}
        onViewPost={this.onViewPost.bind(this, item, index)}
        layout={layout}
      />
    )
  }

  render() {
    const { onBack, type, typeList, isFetching } = this.props

    const backgroundColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [
        'rgba(255,255,255,0)',
        'rgba(255,255,255,.5)',
        'rgba(255,255,255,.75)',
      ],
    })

    const renderHeader = () => (
      <BrowseLocation
        backgroundColor={backgroundColor}
        onBack={onBack}
        isTypeDetail={type}
      />
    )
    const renderFooter = () => {
      if (isFetching) return <Spinkit />

      return (
        <View style={styles.more}>
          <FlatButton
            name="arrow-down"
            text={isFetching ? 'LOADING...' : 'MORE'}
            load={this.nextPosts}
          />
        </View>
      )
    }
    return (
      <Animated.ScrollView
        stickySectionHeadersEnabled
        stickyHeaderIndices={[0]}
        style={styles.body}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {renderHeader()}
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={typeList.list}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          numColumns={2}
          ListFooterComponent={renderFooter()}
        />
      </Animated.ScrollView>
    )
  }
}

const mapStateToProps = ({ homeLayout }, ownProps) => {
  const index = ownProps.index
  return {
    typeList: homeLayout[index],
  }
}

export default connect(mapStateToProps, { fetchPosts })(TypeDetail)
