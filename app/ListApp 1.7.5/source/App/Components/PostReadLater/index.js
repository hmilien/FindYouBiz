/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Swipeout from 'react-native-swipeout'

import { Tools } from '@common'
import css from './styles'
import { connect } from 'react-redux';
import { removeBookMark } from '@redux/actions';

class PostReadLater extends Component {
  constructor(props) {
    super(props)
    this.state = { isRemove: false }
  }

  removePost(post) {
    this.props.removeBookMark(post)
    this.setState({ isRemove: true })
  }

  onOpen = () => {}

  render() {
    if (this.state.isRemove) {
      return null
    }

    const swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: '#E3222C',
        borderColor: '#fff',
        borderWidth: '2',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => {
          this.removePost(this.props.post)
        },
      },
    ]
    const { onViewPost, post } = this.props
    const imageURL = Tools.getImage(post)
    const postTitle =
      typeof post.title.rendered != 'undefined' ? post.title.rendered : '';

    return (
      <Swipeout
        onOpen={this.onOpen}
        style={{ backgroundColor: '#fff' }}
        right={swipeBtns}>
        <View style={css.panel} onPress={onViewPost}>
          <TouchableOpacity onPress={onViewPost}>
            <Image source={{ uri: imageURL }} style={css.image} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onViewPost}>
            <View style={css.title}>
              <Text style={css.name}>
                {Tools.getDescription(postTitle, 150)}
              </Text>
              <Text style={css.time}>
                <TimeAgo time={post.date} hideAgo={true} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeout>
    )
  }
}

export default connect(
  null,
  { removeBookMark }
)(PostReadLater)
