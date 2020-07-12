/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { User, Back } from '@navigation/Icons'
import { BookMark } from '@container'
import { Languages, Images } from '@common'

export default class Index extends Component {
  _renderToolbar = () => {
    const { onLogIn, onBack } = this.props
    return (
      <View style={styles.toolbar}>
        <View style={styles.menu}>
          {Back(() => onBack(), Images.icons.LongBack, '#000')}
        </View>
        <Text style={styles.textTop}>{Languages.textBookMark}</Text>
        {User(onLogIn)}
      </View>
    )
  }

  render() {
    const { onViewPost } = this.props

    return (
      <View style={styles.body}>
        {this._renderToolbar()}
        <BookMark onViewPost={onViewPost} />
      </View>
    )
  }
}
