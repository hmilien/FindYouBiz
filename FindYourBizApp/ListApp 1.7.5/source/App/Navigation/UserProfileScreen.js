/** @format */

import React, { Component } from 'react'

import { User } from '@container'
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class UserProfileScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render = () => {
    const { user, navigation } = this.props
    const onViewPost = (item, index, parentPosts) =>
      navigation.navigate('postDetail', { post: item, index, parentPosts })
    const onReload = () => navigation.navigate('readlater')
    return (
      <SafeAreaView style={{flex: 1}}>
        <User
          userData={user.data}
          onViewPost={onViewPost}
          onReload={onReload}
          onBack={() => navigation.goBack()}
          navigation={navigation}
          onLogIn={() => navigation.navigate('login')}
          postNewListing={() => navigation.navigate('postNewListing')}
        />
      </SafeAreaView>
      
    )
  }
}
const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(UserProfileScreen)
