/** @format */

import React, { PureComponent } from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native'

import { Config, Images, Constants } from '@common'
import { Toolbar, Location } from '@components'
import styles from './styles'

export default class AnimatedToolbar extends PureComponent {
  _renderSearch = () => {
    return !this.props.disabledSearch ? (
      <TouchableOpacity
        hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
        style={styles.search}
        onPress={this.props.onViewSearch}>
        <Image source={Images.icons.iconsearchBar} style={styles.iconSearch} />
      </TouchableOpacity>
    ) : (
      <View />
    )
  }
  render() {
    let { scrollY, onPressRight } = this.props

    const backgroundColor = scrollY.interpolate({
      inputRange: [
        0,
        Constants.Header.HEADER_MIN_HEIGHT / 2,
        Constants.Header.HEADER_MIN_HEIGHT,
      ],
      outputRange: [
        'rgba(255,255,255,0)',
        'rgba(255,255,255,.5)',
        'rgba(255,255,255, 1)',
      ],
    })

    const color = scrollY.interpolate({
      inputRange: [0, Constants.Header.HEADER_MIN_HEIGHT],
      outputRange: ['rgba(0,0,0,1)', 'rgba(0,0,0,1)'],
    })

    return (
      <Animated.View style={[styles.navbar]}>
        {Config.Local.BannerHeader && !Config.Local.BannerHeader.enable && this._renderSearch()}
        <Toolbar color={color} />
        <Location onPressRight={onPressRight} color={color} />
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
      </Animated.View>
    )
  }
}
