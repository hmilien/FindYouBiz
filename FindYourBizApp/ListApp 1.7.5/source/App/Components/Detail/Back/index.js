/** @format */

import React, { PureComponent } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { Images, Constants } from '@common'
import styles from './style'

export default class Back extends PureComponent {
  render() {
    let { onBack, scrollY } = this.props
    const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }

    const opacityAnimate = scrollY.interpolate({
      inputRange: [0, Constants.Window.bannerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    return (
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onBack}
        style={styles.btnBack}>
        <Animated.Image source={Images.DetailBackIcon} style={[styles.icon]} />

        <Animated.Image
          source={Images.BlackBackIcon}
          style={[styles.icon, styles.iconBlack, { opacity: opacityAnimate }]}
        />
      </TouchableOpacity>
    )
  }
}
