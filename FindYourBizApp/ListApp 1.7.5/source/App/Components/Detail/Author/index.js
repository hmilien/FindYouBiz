/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Share} from 'react-native'
import { Languages, Tools } from '@common'
import styles from './style'
import {ImageCache} from '@components'
import TimeAgo from 'react-native-timeago'

class Author extends PureComponent {

  render() {
    let {post, style} = this.props
    const authorName = Tools.getAuthorName(post)
    const authorAvatar = Tools.getAuthorAvatar(post)
    return (
      <View style={[styles.container,style]}>
        <ImageCache source={{uri: authorAvatar}} style={styles.avatar}/>
        <View style={styles.wrap}>
          <Text style={styles.name}>{authorName}</Text>
          <TimeAgo style={styles.time} time={post.date} />
        </View>
        <TouchableOpacity style={styles.btnFollow} activeOpacity={0.75} onPress={this.shareText}>
          <Text style={styles.follow}>{Languages.share}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  shareText = () => {
    let {post} = this.props
    const url = post.link;
    const title = typeof post.title.rendered != 'undefined' ? Tools.formatText(post.title.rendered, 300) : "";

    Share.share({
        message: title,
        url: url,
        title: title
      },
      {
        dialogTitle: title,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ],
        tintColor: 'blue'
      }).catch((error) =>{});
  }
}

export default Author
