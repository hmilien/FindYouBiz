/** @format */

import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
  TouchableHighlight,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { Events, warn, Device } from '@common'
import styles from './styles'
export default class CloseButton extends Component {
  onPress = () => this.props.onPress && this.props.onPress()

  render() {
    const {
      style,
      isFilter,
      isFilterAdvance,
      isBooking,
      isComment,
      isChat,
    } = this.props
    const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }

    return (
      <TouchableOpacity
        style={[
          styles.iconZoom,
          isFilter && styles.closeRight,
          isBooking && { top: 35 },
          isFilterAdvance && { top: 45 },
          isChat && { top: 25, right: 12 },
          style && style,
        ]}
        hitSlop={hitSlop}
        onPress={this.onPress}>
        <Icon
          style={[
            styles.textClose,
            isBooking && styles.textCloseBooking,
            isComment && styles.textComment,
            isChat && { fontSize: 26 },
          ]}
          name="close"
          size={Device.isIphoneX ? 40 : 32}
          color={isChat ? 'rgba(0,0,0, 9)' : 'rgba(0,0,0, 0.4)'}
          backgroundColor="transparent"
        />
      </TouchableOpacity>
    )
  }
}
