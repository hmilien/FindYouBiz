/** @format */

import React, { PureComponent } from 'react'
import { View, TextInput } from 'react-native'
import {
  HeaderPage,
  ProcessModal,
  PostHeading,
  PostNewsDialog,
} from '@components'
import { Languages, Events } from '@common'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import styles from './styles'
import { CREATE_POST_SUCCESS, CREATE_POST_FAIL } from '@redux/types'
import { isEmpty } from 'lodash'
class PostNewContent extends PureComponent {
  constructor(props) {
    super(props)
    // this.metaKeys = {}
  }
  state = {
    value: '',
    percent: 0,
    dialogType: '',
    message: '',
  }

  render() {
    let { onBack } = this.props
    var { value, percent, dialogType, message } = this.state

    return (
      <View style={styles.container}>
        <HeaderPage
          onBack={onBack}
          title={Languages.listingContent}
          hideRightButton={false}
          rightTitle={Languages.submit}
          onRightPress={this.showConfirm}
        />
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            placeholderTextColor="#707070"
            placeholder={Languages.composeTheContent}
            value={value}
            onChangeText={(value) => this.setState({ value })}
            multiline={true}
          />
        </View>
        {/*<KeyboardAwareScrollView>
          <View style={styles.content}>
            {typeof Config.PostNewListing !== 'undefined' &&
              Config.PostNewListing.map((item, index) => {
                return (
                  <PostHeading
                    key={index}
                    title={item.name}
                    style={styles.postHeading}
                    onChangeText={(text) => (this.metaKeys[item.key] = text)}
                  />
                )
              })}
          </View>
            </KeyboardAwareScrollView>*/}
        <ProcessModal ref="process" progress={percent} />
        <PostNewsDialog
          ref="dialog"
          type={dialogType}
          onSubmit={this.submit}
          message={message}
        />
      </View>
    )
  }

  showConfirm = () => {
    this.setState({ dialogType: 'confirm' }, () => {
      this.refs.dialog.show()
    })
  }

  _login = () => {
    Events.toast('Error is occured. Please login again')
  }

  submit = () => {
    this.refs.dialog.hide(() => {
      if (this.state.value.length > 0 && this.postNews != true) {
        const { getParam } = this.props.navigation
        let post = getParam('post')
        const pickMap = getParam('pickMap', '')
        // console.warn(['pickMap', pickMap])
        this.postNews = true
        this.refs.process.show()
        let meta_input = {
          _job_location: post.location,
          _job_title: post.title,
          _job_description: this.state.value,
          _case27_listing_type: post.listingType.name
            ? post.listingType.name.toLowerCase()
            : post.listingType.slug,
        }
        if (typeof pickMap != 'undefined') {
          meta_input = {
            ...meta_input,
            geolocation_lat:
              typeof pickMap.latitude != 'undefined' ? pickMap.latitude : '',
            geolocation_long:
              typeof pickMap.longitude != 'undefined' ? pickMap.longitude : '',
          }
        }

        this.props.createPost(
          {
            imageUri: post.imageUri,
            token: this.props.token ? this.props.token : this._login,
            user: this.props.data,
            meta_input,
            title: post.title,
            content: this.state.value,
            type: 'job_listing',
          },
          (percent) => {
            this.setState({ percent })
          }
        )
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type == CREATE_POST_FAIL && this.postNews == true) {
      this.postNews = false
      this.refs.process.hide(() => {
        this.setState({ dialogType: 'error', message: nextProps.message })
        this.refs.dialog.show()
      })
    }

    if (nextProps.type == CREATE_POST_SUCCESS && this.postNews == true) {
      this.postNews = false
      this.props.fetchPostsByUser(
        this.props.data.userId,
        1,
        this.props.data.jwtToken
      )
      this.refs.process.hide(() => {
        this.setState({ dialogType: 'success' })
        this.refs.dialog.show()
        setTimeout(() => {
          this.refs.dialog.hide(() => {
            this.props.onClose()
          })
        }, 3000)
      })
    }
  }
}

const mapStateToProps = ({ posts, user }) => {
  return {
    type: posts.type,
    data: user.data,
    token: user.token,
    message: posts.message,
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { createPost, fetchPostsByUser } = require('@redux/actions')
  return {
    ...ownProps,
    ...stateProps,
    createPost: (data, progress) => dispatch(createPost(data, progress)),
    fetchPostsByUser: (id, page, token) =>
      dispatch(fetchPostsByUser(id, page, token)),
  }
}
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PostNewContent)
