/** @format */
// @flow
import React from 'react'
import { Images } from '@common'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import TimeAgo from 'react-native-timeago'
import styles from './styles'

export default class Item extends React.Component {
  render() {
    const { onChat, item } = this.props
    return (
      <TouchableOpacity
        onPress={() => onChat(item)}
        style={styles.item}
        key={item.name}>
        <View style={styles.left}>
          <View style={styles.img}>
            <Image
              defaultSource={Images.defaultUserChat}
              source={{
                uri: item.avatar ? item.avatar : Images.defaultUserChat,
              }}
              style={styles.image}
            />
          </View>
          <View style={{}}>
            <Text style={styles.name}>{item.name}</Text>
            <TimeAgo style={styles.time} time={item.createdAt} />
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={this._call}>
            <Image source={Images.icons.videocall} style={styles.vcall} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._call}>
            <Image source={Images.icons.call} style={styles.call} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}
