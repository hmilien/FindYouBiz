/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import { Config, Languages } from '@common'
import styles from './style'
import Comment from '@services/Comment'
import { DisqusLogin } from '@components'
import { connect } from 'react-redux'

class InputComment extends PureComponent {
  state = {
    loading: false,
    comment: '',
  }

  static defaultProps = {
    autoFocus: true,
    behavior: 'position',
    keyboardVerticalOffset: 0,
  }

  render() {
    let { loading, comment } = this.state
    let { style, autoFocus, behavior, keyboardVerticalOffset } = this.props
    return (
      <KeyboardAvoidingView
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={[styles.content, style]}>
          <TextInput
            ref="input"
            autoFocus={autoFocus}
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholderTextColor={'rgba(191, 192, 192, 1)'}
            autoCorrect={false}
            placeholder={Languages.addComment}
            //onEndEditing={this.hide}
            value={comment}
            onChangeText={(comment) => this.setState({ comment })}
          />
          <TouchableOpacity style={styles.btnAdd} onPress={this.writeComment}>
            {loading && <ActivityIndicator />}
            {!loading && <Text style={styles.add}>{Languages.add}</Text>}
          </TouchableOpacity>
        </View>
        <DisqusLogin
          ref="disqus"
          redirectUrl={Config.Disqus.callback_url}
          clientId={Config.Disqus.public_key}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={(error) => {}}
        />
      </KeyboardAvoidingView>
    )
  }

  writeComment = () => {
    let { comment } = this.state
    if (Config.Disqus.enabled) {
      if (
        this.props.access_token == undefined ||
        this.props.access_token == null
      ) {
        this.checkAccessToken((access_token) => {
          if (this.thread != undefined && comment != undefined) {
            this.postCommentOnDisqus(access_token, this.thread, comment)
          }
        })
      } else {
        if (this.thread != undefined && comment != undefined) {
          this.postCommentOnDisqus(
            this.props.access_token,
            this.thread,
            comment
          )
        }
      }
    } else {
      this.checkAccessToken(() => {
        this.postCommentOnWP(comment)
      })
    }
  }

  postCommentOnDisqus = (access_token, thread, comment) => {
    this.setState({ loading: true })
    let parent = null
    Comment.createComment(thread, parent, comment, access_token)
      .then((body) => {
        this.setState({ loading: false })
        if (body.code != 0) {
          this.props.onHide()
          setTimeout(() => {
            alert(body.response)
          }, 500)
        } else {
          this.setState({ comment: '' })
          this.props.onHide(body.response)
        }
      })
      .catch((error) => {
        this.setState({ loading: false })
      })
  }

  postCommentOnWP = (comment) => {
    this.setState({ loading: true })
    let { post, data } = this.props
    Comment.postCommentByPost(post.id, data.email, data.displayName, comment)
      .then((body) => {
        this.setState({ loading: false })
        this.setState({ comment: '' })
        this.props.onHide(body)
      })
      .catch((error) => {
        this.setState({ loading: false })
      })
  }

  componentDidMount() {
    var self = this
    //create thread if not existed
    Comment.getThreadByIdentify(this.props.post.id)
      .then((body) => {
        if (body.response != undefined && body.response.length == 1) {
          this.thread = body.response[0].id
        } else {
          Comment.createThread(
            this.props.post.id,
            this.props.post.title.rendered
          )
            .then((body) => {
              if (body.response != undefined) {
                self.thread = body.response.id
              }
            })
            .catch((error) => {})
        }
      })
      .catch((error) => {})
  }

  checkAccessToken = (callback) => {
    var self = this
    if (Config.Disqus.enabled) {
      AsyncStorage.getItem('@access_token', (err, access_token) => {
        if (err || !access_token || access_token.length == 0) {
          Alert.alert(
            Languages.loginRequired,
            Languages.loginRequiredMsg,
            [
              {
                text: Languages.cancel,
                onPress: () => {},
                style: 'cancel',
              },
              { text: Languages.ok, onPress: () => self.refs.disqus.show() },
            ],
            { cancelable: false }
          )
        } else {
          callback(access_token)
        }
      })
    } else {
      if (this.props.data == null || this.props.data == undefined) {
        Alert.alert(
          Languages.loginRequired,
          Languages.loginRequiredMsg,
          [
            {
              text: Languages.cancel,
              onPress: () => {},
              style: 'cancel',
            },
            { text: Languages.ok, onPress: () => self.props.onLogin() },
          ],
          { cancelable: false }
        )
      } else {
        callback()
      }
    }
  }

  onLoginSuccess = (code) => {
    Comment.getAccessToken(code)
      .then((body) => {
        if (body.access_token != undefined && body.access_token.length > 0) {
          AsyncStorage.setItem('@access_token', body.access_token)
          AsyncStorage.setItem('@refresh_token', body.refresh_token)
        } else {
          alert('Login failed.')
        }
      })
      .catch((error) => {})
  }
}

const mapStateToProps = ({ user }) => ({
  data: user.data,
})
export default connect(
  mapStateToProps,
  {}
)(InputComment)
