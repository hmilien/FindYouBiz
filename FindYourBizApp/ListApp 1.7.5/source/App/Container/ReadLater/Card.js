/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TimeAgo from 'react-native-timeago'
import User from '@services/User'
import Tools from '@common/Tools'
import CommentIcons from '@components/CommentIcons/Index'
import css from './styles'
import Constants from '@common/Constants'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = { isRemove: false }
  }

  viewPost() {
    const { navigate } = this.props.navigation
    navigate('postDetail', { post: this.props.post })
    // Actions.postDetails({post: this.props.post});
  }

  removePost(post) {
    User.removePost(post)
    this.setState({ isRemove: true })
  }

  render() {
    if (this.state.isRemove) {
      return null
    }

    const data = this.props.post
    const imageURL = Tools.getImage(data)
    const postTitle =
      typeof data.title.rendered != 'undefined' ? data.title.rendered : ''

    return (
      <View style={css.viewShadow}>
        <TouchableOpacity style={css.card} onPress={this.viewPost.bind(this)}>
          <Image source={{ uri: imageURL }} style={css.cardImage} />

          <View style={css.cardTitle}>
            <Text style={css.cardName}>
              {Tools.getDescription(postTitle, 150)}
            </Text>
            <Text style={css.cardTime}>
              <TimeAgo time={data.date} hideAgo={true} />
            </Text>
          </View>

          <CommentIcons
            style={Constants.RTL ? css.shareIcon : null}
            post={this.props.post}
            hideCommentIcon={true}
            hideLoveIcon={true}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
