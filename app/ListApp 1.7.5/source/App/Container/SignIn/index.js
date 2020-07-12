/** @format */

import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'

import { Spinkit } from '@components'
import { Events, Config, Languages } from '@common'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Permissions, Notifications } from '@expo'
import { fetchUserData, fetchPostsBookmark } from '@redux/actions'
import { connect } from 'react-redux'
import { FacebookAPI, User } from '@services'
import css from './style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fbLoading: false,
      appLoading: false,
      email: '',
      password: '',
    }
  }

  updateLoading = (status) => this.setState({ loading: status })

  getToken = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }

      // Stop here if the user did not grant permissions
      // if (finalStatus !== 'granted') {
      //   return
      // }
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      return token
    } catch (err) {
      console.warn(err)
    }
  }

  _sendPush = (token, name, text) => {
    try {
      return fetch(Config.PushNotification.saveTokens, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: token,
          title: `New Message from ${name}`,
          body: `${name} - ${text} `,
        }),
      })
    } catch (err) {
      console.warn('err', err)
    }
  }

  loggedInSuccessfully = () => {
    Events.toast(Languages.loginSuccess)
    this.updateLoading(false)
    User.clearPosts()
    setTimeout(() => {
      this.props.fetchPostsBookmark()
      this.props.fetchUserData()
    }, 500)
  }

  loginFailure = (error) => {
    this.updateLoading(false)
    Events.toast(error.message)
  }

  btnLogIn = async () => {
    const { netInfo } = this.props
    if (!netInfo.isConnected) {
      return Events.toast(Languages.noConnection)
    }
    this.updateLoading(true)

    User.login(
      this.state.email.trim(),
      this.state.password,
      this.loggedInSuccessfully,
      this.loginFailure
    )
  }

  logInWithFacebook = async () => {
    const { facebookId } = this.props
    this.setState({ fbLoading: true })
    const result = await FacebookAPI.login(facebookId)

    if (result.type === 'success') {
      const token = result.token
      User.loginFacebook(token.toString())
        .then((data) => {
          if (data) {
            this.loggedInSuccessfully()
          }
        })
        .catch((err) => {
          this.setState({ fbLoading: false })
          this.loginFailure(err)
        })
    } else {
      this.setState({ fbLoading: false })
    }
  }

  stopAndToast = (msg) => {
    Events.toast(msg)
    this.setState({ appLoading: false })
  }

  render() {
    if (this.state.appLoading) {
      return <Spinkit size={30} type="FadingCircle" color="#FFFFFF" />
    }

    return (
      <KeyboardAwareScrollView
        innerRef={(ref) => {
          this.scroll = ref
        }}>
        <View style={css.wrap}>
          <View style={css.body}>
            <View style={css.wrapForm}>
              <View style={css.textInputWrap}>
                <Text style={css.textLabel}>{Languages.email}</Text>
                <TextInput
                  placeholder={Languages.enterEmail}
                  underlineColorAndroid="transparent"
                  style={css.textInput}
                  blurOnSubmit={false}
                  autoFocus={true}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>

              <View style={css.textInputWrap}>
                <Text style={css.textLabel}>{Languages.passwordUp}</Text>
                <TextInput
                  placeholder={Languages.enterPassword}
                  underlineColorAndroid="transparent"
                  style={css.textInput}
                  secureTextEntry
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>
            </View>

            <View style={css.wrapButton}>
              <TouchableOpacity style={css.btnLogIn} onPress={this.btnLogIn}>
                {this.state.loading ? (
                  <Spinkit />
                ) : (
                  <Text style={css.btnLogInText}> {Languages.login} </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[css.btnLogIn, css.buttonView]}
                onPress={this.logInWithFacebook}>
                {this.state.fbLoading ? (
                  <Spinkit color={'#FFF'} />
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="facebook" size={16} color="#FFF" />
                    <Text style={css.btnLogInLabel}>{Languages.facebook} </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = ({ netInfo, config }) => ({
  netInfo,
  facebookId: Config.Local.enable
    ? Config.Local.general.Facebook.logInID
    : config.general.Facebook.logInID,
})
export default connect(
  mapStateToProps,
  { fetchUserData, fetchPostsBookmark }
)(SignIn)
