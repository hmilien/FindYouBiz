/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, Animated, View } from 'react-native'
import { Tools } from '@common'
import {
  WebView,
  RelatedPost,
  DetailHeader,
  DetailBack,
  DetailAuthor,
} from '@components'
import styles from './styles_news'

export default class News extends PureComponent {
  static propTypes = {
    onViewPost: PropTypes.func,
    post: PropTypes.object,
  }

  state = { scrollY: new Animated.Value(0) }

  render() {
    const { post, onBack, postList, onViewPost } = this.props
    const postContent = typeof post.content === 'undefined' ? '' : post.content
    const title = Tools.formatText(post.title.rendered)
    let { scrollY } = this.state

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentList}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}>
          <DetailHeader post={post} scrollY={scrollY} style={styles.header} />

          <View style={styles.mainView}>
            <View style={styles.authorWrap}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              <DetailAuthor post={post} style={styles.author} />
            </View>
            <View style={styles.content}>
              <WebView html={postContent} style={styles.viewContent} />
              <RelatedPost
                posts={postList.filter((item) => item.id != post.id)}
                onViewPost={onViewPost}
              />
            </View>
          </View>
        </Animated.ScrollView>

        <DetailBack scrollY={scrollY} onBack={onBack} />
      </View>
    )
  }
}
