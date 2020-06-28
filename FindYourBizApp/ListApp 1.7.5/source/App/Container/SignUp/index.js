/** @format */

'use strict'
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import css from './styles'
import { Tools, Events, warn, Languages } from '@common'
import { Spinkit } from '@components'
import { User, WooWorker, WPUserAPI } from '@services'
import { connect } from 'react-redux'
import { fetchPostsBookmark, fetchUserData } from '@redux/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
      password: '',
      name: '',
    }
  }

  loggedInSuccessfully = () => {
    Events.toast(Languages.loginSuccess)
    this.setState({ loading: false })
    User.clearPosts()
    setTimeout(() => {
      this.props.fetchPostsBookmark()
      this.props.fetchUserData()
    }, 500)
  }

  loginFailure = (error) => {
    this.setState({ loading: false })
    Events.toast(error.message)
  }

  btnSignUp = async () => {
    this.setState({
      loading: true,
    })

    User.create(
      this.state.email,
      this.state.password,
      this.state.name,
      (user) => {
        if (user) {
          // Events.closeUserModal()
          this.loggedInSuccessfully()
        }
      },
      (error) => {
        this.loginFailure(error)
      }
    )
  }

  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode)
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} scrollEnabled={false}>
        <View style={css.wrap}>
          <View style={css.body}>
            <View style={css.wrapForm}>
              <View style={css.textInputWrap}>
                <Text style={css.textLabel}>{Languages.name}</Text>
                <TextInput
                  placeholder={Languages.enterName}
                  underlineColorAndroid="transparent"
                  style={css.textInput}
                  onChangeText={(text) => this.setState({ name: text })}
                />
              </View>

              <View style={css.textInputWrap}>
                <Text style={css.textLabel}>{Languages.email}</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={Languages.enterEmail}
                  style={css.textInput}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
              <View style={css.textInputWrap}>
                <Text style={css.textLabel}>{Languages.passwordUp}</Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={Languages.enterPassword}
                  style={css.textInput}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>

              <View style={css.wrapButton}>
                {this.state.loading ? (
                  <TouchableOpacity style={css.btnLogIn}>
                    <Spinkit size={20} type="FadingCircle" color="#FFFFFF" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={css.btnLogIn}
                    onPress={this.btnSignUp}>
                    <Text style={css.btnLogInText}> {Languages.signup} </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(
  null,
  { fetchPostsBookmark, fetchUserData }
)(SignUp)
