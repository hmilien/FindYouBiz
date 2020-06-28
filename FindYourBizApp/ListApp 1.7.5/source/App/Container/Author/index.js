'use strict'
import React, { Component } from 'react'
import { FlatList } from 'react-native'
import styles from './styles'
import { PostReadLater } from '@components'
import { fetchPostsByUser } from '@redux/actions'
import { connect } from 'react-redux'

class Author extends Component {
  constructor(props) {
    super(props)
    this.page = 1
  }

  componentWillMount() {
    const { data } = this.props.user

    if (data != null) {
      this.props.fetchPostsByUser(data.id, this.page)
    }
  }

  onViewPost(item, index) {
    this.props.onViewPost(item, index)
  }

  renderItem({ item, index }) {
    return <PostReadLater post={item} onViewPost={this.onViewPost.bind(this)} />
  }

  nextPosts() {
    this.page += 1
    const { data } = this.props.user

    if (data != null) {
      this.props.fetchPostsByUser(data.id, this.page)
    }
  }

  render() {
    const { user } = this.props
    return (
      <FlatList
        style={styles.flatlist}
        horizontal={false}
        data={user.posts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem.bind(this)}
        onEndReachedThreshold={200}
        onEndReached={() => {
          this.nextPosts()
        }}
      />
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })
module.exports = connect(mapStateToProps, { fetchPostsByUser })(Author)
