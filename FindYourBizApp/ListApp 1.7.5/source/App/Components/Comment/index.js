/** @format */

'use strict'

import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'

import css from './style'
import { Languages, Color, Events } from '@common'
import Rating from 'react-native-star-rating'
import Api from '@services/Api'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import DropdownAlert from 'react-native-dropdownalert'
import { fetchComments } from '@redux/actions'
import { connect } from 'react-redux'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      txtComment: '',
      addComment: false,
      starCount: 0,
      statusRate: Languages.VeryGood,
    }
  }

  componentWillMount() {
    Events.onCommentShowError(this.showError)
  }

  componentDidMount() {
    this.props.fetchComments(this.props.post.id)
  }

  showError = (message) => {
    this.dropdown && this.dropdown.alertWithType('error', 'Error', message)
  }

  resetForm = () => {}

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    })
  }

  submitComment = () => {
    const { cookie, post } = this.props
    var self = this
    if (this.state.txtComment == '') {
      return Events.commentShowError(Languages.errInputComment)
    }
    if (this.state.starCount == 0) {
      return Events.commentShowError(Languages.errRatingComment)
    }

    let commentData = {
      post_id: post.id,
      content: this.state.txtComment,
      cookie,
      meta: JSON.stringify({
        pixrating: this.state.starCount,
        pixrating_title: this.state.txtComment,
      }),
    }
    Api.createComment(commentData).then((data) => {
      if (data.status === 'ok') {
        this.resetForm()
        self.setState({
          addComment: true,
          txtComment: '',
        })
        Events.toast(Languages.thanksForReview)
        Events.closeCommentModal()
      }
    })
  }

  render() {
    const renderCommentInput = () => {
      return (
        <View style={{ flex: 1 }}>
          <View style={css.rowHead}>
            <Text style={css.headText}>{Languages.yourcomment}</Text>
          </View>
          <View style={css.inputCommentWrap}>
            <TextInput
              style={css.inputCommentText}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              multiline={true}
              value={this.state.txtComment}
              onChangeText={(text) => this.setState({ txtComment: text })}
              placeholder={Languages.placeComment}
              onSubmitEditing={this.submitComment.bind(this)}
            />
            <TouchableOpacity onPress={this.submitComment} style={css.sendView}>
              <Icon
                name="cursor"
                size={16}
                color="white"
                style={css.sendButton}
              />
              <Text style={css.sendText}>{Languages.send}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const renderStatusRate = (value) => {
      switch (value) {
        case 1:
          return Languages.Terrible
        case 2:
          return Languages.Poor
        case 3:
          return Languages.Average
        case 4:
          return Languages.VeryGood
        case 5:
          return Languages.Exceptional
        default:
          return Languages.Average
          break
      }
    }

    return (
      <View style={css.wrapComment}>
        <Text style={css.headCommentText}>{Languages.comment}</Text>
        <View style={css.fullWidth}>
          <View style={css.wrapRating}>
            <Rating
              disabled={false}
              maxStars={5}
              starSize={26}
              emptyStar={'star-o'}
              fullStar={'star'}
              rating={this.state.starCount}
              starColor={Color.starRating}
              fullStarColor={Color.starRating}
              halfStarColor={Color.starRating}
              emptyStarColor={'#ccc'}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={css.besideStar}>
            <View style={css.statusRate}>
              <Text style={css.textStatusRate}>
                {renderStatusRate(this.state.starCount)}
              </Text>
            </View>
          </View>
        </View>
        {renderCommentInput()}
        <DropdownAlert ref={(ref) => (this.dropdown = ref)} />
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    userData: user.data,
    cookie: user.cookie,
  }
}
export default connect(
  mapStateToProps,
  { fetchComments }
)(Comment)
