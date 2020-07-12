'use strict'
import React, { Component } from 'react'
import { FlatList, View, Platform } from 'react-native'
import css from './style'
import { connect } from 'react-redux'
import { fetchVideos } from '@redux/actions'
import VideoControl from './VideoControl'
import { Constants, Config, warn } from '@common'
import { Spinkit, FlatButton } from '@components'

class ListVideo extends Component {
  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false
  }

  componentDidMount() {
    if (this.page == 1) {
      this.props.fetchVideos(this.page, null, Config.CategoryVideo)
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.videos.length != this.props.videos.length
  }

  onViewPost(item, index) {
    this.props.onViewPost(item, index, this.props.videos)
  }

  renderItem({ item, index }) {
    return (
      <VideoControl
        onViewPost={this.onViewPost.bind(this, item, index, this.props.videos)}
        video={item}
        navigation={this.props.navigation}
      />
    )
  }

  nextPosts = () => {
    this.page += 1
    this.isNextPost = true
    this.props.fetchVideos(this.page)
  }

  render() {
    const { videos, isFetching } = this.props

    const renderFooter = () => {
      if (isFetching) return <Spinkit />
      return (
        <View style={css.more}>
          <FlatButton
            name="arrow-down"
            text={isFetching ? 'LOADING...' : 'MORE'}
            load={this.nextPosts}
          />
        </View>
      )
    }

    return (
      <FlatList
        data={videos}
        contentContainerStyle={
          Platform.OS === 'android' ? css.listAndroid : css.listView
        }
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem.bind(this)}
        ListFooterComponent={renderFooter()}
        onEndReached={this.isNextPost && this.nextPosts}
      />
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return { videos: posts.videos, isFetching: posts.isFetching }
}
export default connect(mapStateToProps, { fetchVideos })(ListVideo)
