/** @format */

// @flow
import React from 'react'
import { View, ImageBackground, Dimensions } from 'react-native'
import { GiftedChat, GiftedAvatar, Bubble } from 'react-native-gifted-chat'
import { Config, Device, Events, Languages } from '@common'
import firebaseApp from '@services/Firebase'

import { clearChat } from '@redux/actions'
import { connect } from 'react-redux'
const { width, height } = Dimensions.get('window')

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.author = props.author
    this.currentUserId = props.user.id ? props.user.id : props.user.userId

    this.state = {
      messages: [],
      height: 0,
    }
    if (this.author != null) {
      this.chatRef = firebaseApp
        .ref()
        .child(`chat/${this.generateChatId(this.currentUserId)}`)
      this.chatRefData = this.chatRef.orderByChild('order')
    }
  }

  componentDidMount() {
    this.props.clearChat()
    this.chatRef && this.listenForItems(this.chatRefData)
  }
  componentWillUnmount() {
    firebaseApp.off()
  }

  listenForItems = (chatRef) => {
    //--- case different
    chatRef.on('value', (snap) => {
      // get children as an array
      const items = []
      snap.forEach((child) => {
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid,
          },
        })
      })

      this.setState({
        messages: items,
      })
    })
  }

  generateChatId = (userId) => {
    if (userId > this.author.id) return `${userId}-${this.author.id}`
    return `${this.author.id}-${userId}`
  }

  onSend = (messages = []) => {
    const { user } = this.props;
    try {

      messages.forEach((message) => {
        const now = new Date().getTime()
        this.chatRef.push({
          _id: now,
          text: message.text,
          createdAt: now,
          uid: this.currentUserId,
          order: -1 * now,
          username: user.username ? user.username : user.email,
          email: user.email,
          name: user.last_name ? user.last_name : user.displayName,
          avatar: user.avatar_url ? user.avatar_url : user.photoURL,
          author: this.author.id,
          read: 0,
        })
      })

      /*--- push for users ---*/
      //from userLogin to author
      firebaseApp
        .ref()
        .child('users')
        .child(this.currentUserId)
        .child(this.author.id)
        .set({
          id: this.author.id,
          name: this.author.username || this.author.name,
          email: this.author.email,
        })

      // from author to userLogin
      firebaseApp
        .ref()
        .child('users')
        .child(this.author.id)
        .child(this.currentUserId)
        .set({
          id: this.currentUserId,
          name: user.username ? user.username : user.email,
          email: user.email,
        })
    } catch (err) {
      console.warn(err)
      Events.toast(err.message)
    }
  }

  _renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{}}
        wrapperStyle={{
          left: {
            borderRadius: 8,
            borderTopLeftRadius: 0,
            backgroundColor: '#FFF',
          },
          right: {
            borderRadius: 8,
            borderTopRightRadius: 0,
            backgroundColor: '#3889F2',
          },
        }}
      />
    )
  }

  _renderAvatar = (props) => {
    return <GiftedAvatar {...props} />
  }

  render() {
    const { user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={Config.Chat.defaultBg}
          style={{
            position: 'absolute',
            flex: 1,
            width,
            height,
            opacity: Config.Chat.opacityBg,
          }}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          placeholder={Languages.typeAmessage}
          renderBubble={this._renderBubble}
          renderAvatar={this._renderAvatar}
          renderAvatarOnTop={true}
          renderCustomView={this._renderCustomView}
          user={{
            _id: this.currentUserId,
            name: user.last_name || user.first_name,
          }}
          bottomOffset={Device.isIphoneX ? 30 : 0}
          // listViewProps={{ backgroundColor: "#FFF" }}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user: user.data })
export default connect(
  mapStateToProps,
  { clearChat }
)(Chat)
