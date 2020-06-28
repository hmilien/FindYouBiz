/** @format */

import React, { Component } from 'react'
import { Text, FlatList, View } from 'react-native'
import styles from './styles'
import { Events, Languages } from '@common'
import { PostReadLater } from '@components'
import { fetchPostsBookmark, clearPosts } from '@redux/actions'
import { connect } from 'react-redux'
import { Clear } from '@navigation/Icons'

class BookMark extends Component {
  componentWillMount() {
    this.clear = Events.onClearPosts(this.clearPosts)
  }
  componentWillUnmount() {
    this.clear && this.clear.remove()
  }
  componentDidMount() {
    this.props.fetchPostsBookmark()
  }

  clearPosts = () => {
    this.props.clearPosts()
  }

  onViewPost = (item, index) => this.props.onViewPost(item, index)

  renderItem = ({ item, index }) => {
    return (
      <PostReadLater
        post={item}
        onViewPost={() => this.onViewPost(item, index)}
      />
    )
  }

  render() {
    const { bookmark } = this.props
    bookmark.posts.length == 0 && (
      <Text style={styles.empty}>{Languages.noBookmark}</Text>
    )

    return (
      <View style={styles.body}>
        {bookmark.posts.length != 0 && (
          <View style={styles.topBar}>{Clear()}</View>
        )}

        <FlatList
          style={styles.flatlist}
          horizontal={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          data={bookmark.posts}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ bookmark }) => ({ bookmark })
export default connect(
  mapStateToProps,
  {
    fetchPostsBookmark,
    clearPosts,
  }
)(BookMark)
