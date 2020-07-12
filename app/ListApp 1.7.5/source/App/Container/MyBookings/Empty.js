/** @format */

import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'
import { Images, Languages } from '@common'

export default class Empty extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Image source={Images.icons.emptyChat} style={styles.imgEmpty} />
        <Text style={styles.title}>{Languages.booking}</Text>
        <Text style={styles.desc}>{Languages.emptyDate}</Text>
        <TouchableOpacity onPress={this.props.onBack} style={styles.backBox}>
          <Text style={styles.backText}>{'Back'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
