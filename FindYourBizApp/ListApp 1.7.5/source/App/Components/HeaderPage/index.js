/** @format */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import { Constants, Config, Images, Languages } from '@common'
import styles from './style'
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity
)

class Header extends PureComponent {
  static defaultProps = {
    scrollY: new Animated.Value(0),
    hideRightButton: true,
  }

  render() {
    let {
      onBack,
      title,
      subTitle,
      style,
      scrollY,
      hideRightButton,
      rightIcon,
      onRightPress,
      rightTitle,
    } = this.props

    const topButton = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [30, 10],
      extrapolate: 'clamp',
    })

    const marginTopSubtitle = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [10, 0],
      extrapolate: 'clamp',
    })

    const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };

    return (
      <Animated.View style={[styles.content, style]}>
        <AnimatedTouchableOpacity
          hitSlop={hitSlop}
          style={[styles.btnBack, {transform: [{ translateY: topButton }] } ]}
          onPress={onBack}>
          <Image source={Images.icons.LongBack} style={styles.backIcon} />
        </AnimatedTouchableOpacity>
        
        {title != undefined && <Animated.Text
          style={[
            styles.largeTitle,
            subTitle == undefined && { marginBottom: 10 },
          ]}>
          {title}
        </Animated.Text>}

        
        {subTitle != undefined && (
          <Animated.Text
            style={[
              styles.subTitle,
              {transform: [{ translateY: marginTopSubtitle }] },
            ]}>
            {subTitle}
          </Animated.Text>
        )}

        {!hideRightButton && (
          <AnimatedTouchableOpacity
            hitSlop={hitSlop}
            style={[styles.rightButton, {transform: [{ translateY: topButton }] }]}
            onPress={onRightPress}>
            {rightIcon != undefined && (
              <Image source={rightIcon} style={styles.icon} />
            )}
            {rightTitle != undefined && (
              <Text style={styles.rightTitle}>{rightTitle}</Text>
            )}
          </AnimatedTouchableOpacity>
        )}
      </Animated.View>
    )
  }
}

export default Header
