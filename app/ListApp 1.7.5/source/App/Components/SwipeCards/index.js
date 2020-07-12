// custom module from - react-native-magazine-listview

import React, { Component } from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ListView,
} from 'react-native'
const { width, height } = Dimensions.get('window')
import css from './style'
import { Tools, Events, Constants } from '@common'
import TimeAgo from 'react-native-timeago'
import { CommentIcons } from '@components'

export default class Index extends Component {
  constructor(props) {
    super(props)
    const imageCards = this.initImages(props.data)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      data: props.data,

      dataSource: ds.cloneWithRows(props.data),
      opacity: new Animated.Value(1),

      images: imageCards.reverse(),

      opacity_values: imageCards.map(() => {
        return new Animated.Value(1)
      }),
      text_opacity: imageCards.map(() => {
        return new Animated.Value(1)
      }),
    }
    this.page = imageCards.length - 1
    this.offset = 0

    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    this.fetchPostData()
  }

  initImages(data) {
    var images = []
    data.map(post => {
      const imageUrl = Tools.getImage(post)
      images.push(imageUrl)
    })
    return images
  }

  viewPost(post) {
    const navigate = this.props.navigate
    navigate('postDetail', { post: post })
    // Actions.postDetails({post: post});
  }

  fetchPostData() {
    Events.postCardFetchData()
  }

  renderRow(post, sectionID, rowID) {
    if (typeof post.title == 'undefined') {
      return null
    }
    const postTitle =
      typeof post.title.rendered == 'undefined'
        ? ''
        : Tools.getDescription(post.title.rendered, 200)
    const authorName = post._embedded.author[0]['name']
    const commentCount =
      typeof post._embedded.replies == 'undefined'
        ? 0
        : post._embedded.replies[0].length

    return (
      <View style={css.cardView}>
        <TouchableOpacity
          style={css.card}
          onPress={this.viewPost.bind(this, post)}
        >
          <Animated.View
            style={{ flex: 1, opacity: this.state.text_opacity[rowID] }}
          >
            <Text style={css.title}>{postTitle}</Text>
            <Text style={css.author}>
              <TimeAgo time={post.date} hideAgo={true} /> by @{authorName}
            </Text>
            <CommentIcons
              style={Constants.RTL ? css.iconShare : null}
              post={post}
              comment={commentCount}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  handleScroll(event) {
    var e = event.nativeEvent

    var currentOffset = e.contentOffset.x
    var offset_ratio = currentOffset / width
    if (currentOffset > this.offset) {
      if (!Number.isInteger(offset_ratio) && offset_ratio > 0) {
        var page = Math.floor(offset_ratio)
        var stack = Math.abs(page - this.state.opacity_values.length + 1)
        if (stack != 0) {
          this.state.opacity_values[stack].setValue(
            Math.abs((currentOffset - width * (page + 1)) / width)
          )
          this.state.text_opacity[page].setValue(
            Math.abs((currentOffset - width * (page + 1)) / width)
          )
          this.state.text_opacity[page + 1].setValue(
            Math.abs((currentOffset - width * page) / width)
          )
        }
      }
    } else {
      if (!Number.isInteger(offset_ratio) && offset_ratio > 0) {
        var page = Math.ceil(offset_ratio)
        var stack = Math.abs(page - this.state.opacity_values.length + 1)
        if (
          this.state.opacity_values[stack + 1] != null &&
          page < this.state.opacity_values.length
        ) {
          this.state.opacity_values[stack + 1].setValue(
            Math.abs(currentOffset - width * page) / width
          )
          this.state.text_opacity[page - 1].setValue(
            Math.abs((currentOffset - width * page) / width)
          )
          this.state.text_opacity[page].setValue(
            Math.abs(currentOffset - width * (page - 1)) / width
          )
        }
      }
    }
    this.offset = currentOffset
  }

  renderImages() {
    var { images, opacity_values } = this.state

    return images.map((image, i) => {
      return (
        <Animated.Image
          key={i}
          style={[css.image, { opacity: opacity_values[i] }]}
          source={{ uri: images[i] }}
        />
      )
    })
  }

  render() {
    var { images, page, opacity } = this.state
    return (
      <View style={css.body}>
        {this.renderImages()}
        <View style={{ position: 'absolute' }}>
          <ListView
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.handleScroll.bind(this)}
            horizontal={true}
            dataSource={this.state.dataSource}
            onEndReachedThreshold={200}
            onEndReached={this.fetchPostData.bind(this)}
            renderRow={this.renderRow}
          />
        </View>
      </View>
    )
  }
}
