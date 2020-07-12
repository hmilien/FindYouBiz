/** @format */

'use strict'
import React, { Component } from 'react'
import { View, Text, Share } from 'react-native'
import css from './style'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconIO from 'react-native-vector-icons/Ionicons'
import IconMater from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppConfig, Color, Tools } from '@common'
import { addBookMark, removeBookMark, fetchPostsBookmark } from '@redux/actions'
import { connect } from 'react-redux'
import { Back } from '@navigation/Icons'
import { WebBrowser } from '@expo'

class Index extends Component {
  checkExist = (post) => {
    const isExists = this.props.wishlists.find((item) => item.id == post.id)
    return isExists
  }

  toggleBookMark = (post) => {
    if (!this.checkExist(post)) {
      this.props.addBookMark(post)
    } else {
      this.props.removeBookMark(post)
    }
  }

  shareText() {
    const post = this.props.post ? this.props.post : AppConfig.Website.url
    const url = post.link
    const title =
      typeof post.title.rendered != 'undefined'
        ? Tools.getDescription(post.title.rendered, 300)
        : ''

    Share.share(
      { message: url, url: url, title: title },
      {
        dialogTitle: 'Share:  ' + title,
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
        tintColor: 'blue',
      }
    ).catch((error) => this.setState({ result: 'error: ' + error.message }))
  }

  externalLink() {
    var url = this.props.post.link ? this.props.post.link : ''
    WebBrowser.openBrowserAsync(url)
  }

  render() {
    const {
      onBack,
      style,
      showLoveIcon,
      showCommentIcon,
      showOpenIcon,
      size,
      showShareIcon,
      showPhoneIcon,
      iconIconHeart,
      color,
      post,
    } = this.props

    const textColor = typeof color == 'undefined' ? '#333' : color

    return (
      <View
        style={
          typeof style == 'undefined' || style === null ? css.shareIcon : style
        }>
        {typeof onBack != 'undefined' && (
          <View style={css.backButton}>{Back(onBack)}</View>
        )}

        {typeof showOpenIcon != 'undefined' && (
          <Icon.Button
            style={css.newsIcons}
            name="share-alt"
            size={size ? size : 16}
            color={textColor}
            onPress={this.externalLink.bind(this)}
            backgroundColor="transparent"
          />
        )}

        {typeof showPhoneIcon != 'undefined' && (
          <IconIO.Button
            style={css.newsIcons}
            onPress={this.shareText.bind(this)}
            name="ios-call"
            size={24}
            color={textColor}
            backgroundColor="transparent"
          />
        )}

        {typeof showShareIcon != 'undefined' && (
          <Icon.Button
            style={css.newsIcons}
            onPress={this.shareText.bind(this)}
            name="share"
            size={size ? size : 16}
            color={textColor}
            backgroundColor="transparent"
          />
        )}

        {typeof showLoveIcon != 'undefined' && (
          <IconMater.Button
            style={css.newsIcons}
            name={!this.checkExist(post) ? 'heart-outline' : 'heart'}
            size={this.props.size ? this.props.size + 4 : 18}
            color={!this.checkExist(post) ? '#FFF' : Color.main}
            onPress={() => this.toggleBookMark(post)}
            backgroundColor={'transparent'}
          />
        )}

        {typeof showCommentIcon != 'undefined' && (
          <Icon.Button
            style={css.commentIcons}
            name="speech"
            size={size ? size : 16}
            color={textColor}
            backgroundColor="transparent">
            <Text style={[css.iconText, { color: textColor }]}>
              {this.props.comment}
            </Text>
          </Icon.Button>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ bookmark }) => ({ wishlists: bookmark.posts })
export default connect(
  mapStateToProps,
  { addBookMark, removeBookMark, fetchPostsBookmark }
)(Index)
