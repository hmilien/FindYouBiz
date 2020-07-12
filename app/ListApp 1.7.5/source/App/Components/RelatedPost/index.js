/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { Constants, Languages } from '@common'
import { PostLayout } from '@components'

export default class RelatedPost extends Component {
  render() {
    const { posts, onViewPost } = this.props
    if (typeof posts == 'undefined' || posts == '') {
      return <View />
    }
    // warn(['related:', posts])

    return (
      <View style={styles.body}>
          {posts.map((post, index) => (
            <PostLayout
              key={index}
              post={post}
              layout={Constants.Layout.readMore}
              onViewPost={() => onViewPost(post, index)}
            />
          ))}
      </View>
    )
  }
}
