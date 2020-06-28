'use strict'
import React, { Component } from 'react'
import { View } from 'react-native'
import css from './style'
import User from '@services/User'
import Tools from '@common/Tools'
// import {LoginButton, AccessToken} from 'react-native-fbsdk';

export default class Index extends Component {
  render() {
    return (
      <View style={css.body}>
        {/*<LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                /!*console.log("facebook login has error: " + result.error);*!/
              }
              else if (result.isCancelled) {
                /!*console.log("facebook login is cancelled.");*!/
              }
              else {
                AccessToken
                  .getCurrentAccessToken()
                  .then((data) => {
                    User.loginFacebook(data.accessToken.toString()).then(function() {
                      Tools.refresh();
                    });
                  })
              }
            }
          }
          onLogoutFinished={() => console.log("facebook is logout.")}/>*/}
      </View>
    )
  }
}
