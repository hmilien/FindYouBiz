/** @format */

import React, { PureComponent } from 'react'
import { View, Image, Dimensions } from 'react-native'
import { Tools } from '@common'
import styles from './styles'

const { width, height } = Dimensions.get('window')

export default class UserProfileHeader extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { userData } = this.props
    let avatar = Tools.getAvatar(userData)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </View>
      </View>
    )
  }
}
