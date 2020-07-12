/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TimeAgo from 'react-native-timeago'
import css from './style'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { Tools, Constants, Config } from '@common'
import CommentIcons from '@components/CommentIcons'

export default class VideoControl extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.video
    const imageURL = Tools.getImage(data, Config.PostImage.large)
    const onViewPost = this.props.onViewPost

    return (
      <View style={css.boxShadow}>
        <View style={css.box}>
          <TouchableOpacity activeOpacity={0.9} onPress={onViewPost}>
            <Image source={{ uri: imageURL }} style={css.imageBox}>
              <View style={css.iconVideo}>
                <Icon name="control-play" size={25} style={css.iconPlay} />
              </View>
              <View style={css.overlayVideo} />
            </Image>
          </TouchableOpacity>

          <View style={css.boxName}>
            <TouchableOpacity activeOpacity={0.9} onPress={onViewPost}>
              <Text style={css.title}>
                {Tools.getDescription(data.title.rendered, 300)}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <View style={css.leftTime}>
                <Text style={css.time}>
                  <TimeAgo time={data.date} hideAgo={true} />
                </Text>
              </View>

              <CommentIcons
                post={this.props.video}
                iconIconHeart={'#000'}
                hideCommentIcon={true}
                hideKnifeIcon
                hidePhoneIcon
                style={Constants.RTL ? css.shareIcon : null}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
