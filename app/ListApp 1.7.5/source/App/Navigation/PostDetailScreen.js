/** @format */

import React, { Component } from 'react'
import { PostDetail } from '@container'
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class PostDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: '#333',
    tabBarVisible: false,
  })

  _goBack = (backToRoute) => {
    const { goBack, getParam, navigate } = this.props.navigation
    let route = backToRoute
    if (typeof backToRoute != 'undefined') {
      let fromSearch = getParam('fromSearch', false)
      if (fromSearch) {
        route = 'search'
      }
      navigate(route)
    } else {
      goBack()
    }
  }

  render() {
    const { getParam, navigate } = this.props.navigation

    const post = getParam('post', this.props.post)
    const postIndex = getParam('index', this.props.index)
    const indexHomeLayout = getParam('indexHomeLayout', undefined)
    const component = getParam('component', this.props.component)
    const isMap = getParam('isMap', undefined)
    const backToRoute = getParam('backToRoute', undefined)

    return (
      <SafeAreaView style={{flex: 1}}>
        <PostDetail
          post={post}
          onBack={() => this._goBack(backToRoute)}
          index={postIndex}
          indexHomeLayout={indexHomeLayout}
          component={component}
          isMap={isMap}
          goToBooking={() => navigate('bookings')}
          onLogin={() => navigate('login', { fromDetail: true })}
          onViewPost={(item, index) =>
            navigate('postDetail', {
              post: item,
              index,
              indexHomeLayout,
              component,
            })
          }
          onChat={(author) => {
            const { user } = this.props
            if (user != null) {
              navigate('chat', { author, backToRoute: 'postDetail' })
            } else {
              navigate('login')
            }
          }}
          onViewCart={() => navigate('cart')}
          onLogIn={() => navigate('login')}
        />
      </SafeAreaView>
      
    )
  }
}

const mapStateToProps = ({ user }) => ({ user: user.data })
export default connect(mapStateToProps)(PostDetailScreen)
