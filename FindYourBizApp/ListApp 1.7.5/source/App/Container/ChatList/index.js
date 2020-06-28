/** @format */
// @flow
import React from 'react'
import { FlatList, View, TouchableOpacity, Image, Text } from 'react-native'
import firebaseApp from '@services/Firebase'
import { Images } from '@common'
import { ChatSearch } from '@components'
import { connect } from 'react-redux'
import Item from './Item'
import styles from './styles'

class ChatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    const { user, onLogin } = this.props
    // console.warn(['user', user])
    if (user != null) {
      const userId = user.uid
      ? user.uid
      : user.data.user ? user.data.user.uid 
      : user.userId
      ? user.userId
      : user.id
      const newItems = []
      console.warn([user, userId])
      firebaseApp.fetch(userId, (snapshot) => {
        if (snapshot != null) {
          Object.keys(snapshot).forEach((key) => {
            newItems.push(snapshot[key])
          })
          this.setState({ list: newItems })
        }
      })
    } else {
      onLogin()
    }
  }

  keyExtractor = (item, index) => `${index}`;

  renderItem = ({ item }) => {
    return <Item item={item} onChat={this.props.onChat} />
  }

  _renderHeader = () => (
    <ChatSearch placeholder={'Search Contact'} {...this.props} />
  )

  _renderEmpty = () => {
    const { onHome } = this.props
    return (
      <View style={styles.body}>
        <Image source={Images.icons.emptyChat} style={styles.imgEmpty} />
        <Text style={styles.title}>{'Empty message'}</Text>
        <Text style={styles.desc}>
          {
            'There is no message on your Inbox Please go to Homepage do explore more!'
          }
        </Text>
        <TouchableOpacity onPress={onHome} style={styles.backBox}>
          <Text style={styles.backText}>{'Back to Home'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    if (this.state.list.length == 0) {
      return this._renderEmpty()
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.list}
        ListHeaderComponent={this._renderHeader}
        renderItem={this.renderItem}
      />
    )
  }
}

const mapStateToProps = ({ user }) => ({ user: user.data })

export default connect(mapStateToProps)(ChatList)
