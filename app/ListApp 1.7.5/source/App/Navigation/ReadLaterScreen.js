/** @format */

import React, { Component } from 'react'
import { ReadLater } from '@container'

import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class ReadLaterScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render = () => {
    const { user, navigation } = this.props
    const onViewPost = (item, index, parentPosts) =>
      navigation.navigate('postDetail', {
        post: item,
        index,
        parentPosts,
        backToRoute: 'userProfile',
      })

    return (
      <SafeAreaView style={{flex: 1}}>
        <ReadLater
          onBack={() => navigation.goBack()}
          onLogIn={() => navigation.navigate('login')}
          userData={user.data}
          onViewPost={onViewPost}
        />
      </SafeAreaView>
      
    )
  }
}
const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(ReadLaterScreen)
