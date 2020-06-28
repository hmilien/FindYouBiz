/** @format */

// @flow
import React from 'react'
import { View } from 'react-native'
import { Chat } from '@container'
import { ChatToolBar } from '@components'
import { SafeAreaView } from 'react-navigation';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false,
  })

  _goBack = (backToRoute) => {
    const { goBack, navigate } = this.props.navigation
    if (typeof backToRoute != 'undefined') {
      navigate(backToRoute)
    } else {
      goBack()
    }
  }

  render() {
    const { getParam } = this.props.navigation
    let author = getParam('author', null)
    const backToRoute =getParam('backToRoute', undefined)
      
    if (author !== null) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ChatToolBar
            onBack={() => this._goBack(backToRoute)}
            label={
              author.name
                ? author.name
                : author.last_name + ' ' + author.first_name
            }
          />
          <Chat author={author} />
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <ChatToolBar onBack={() => this._goBack()} label={''} />
        </SafeAreaView>
      )
    }
  }
}
