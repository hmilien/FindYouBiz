/** @format */

import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import { Menu, Back } from '@navigation/Icons'
import styles from './styles'
import { Images } from '@common'
const headerMinHeight = 50

export default class AnimatedHeader extends Component {
  render() {
    const { scrollY, label, goBack, image, right } = this.props

    const titleTransformY = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    })
    const titleTransformX = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [0, 25],
      extrapolate: 'clamp',
    })
    const titleScale = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    })
    const navbarOpacity = scrollY.interpolate({
      inputRange: [0, headerMinHeight * 1.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.body}>
        <Animated.View
          style={[styles.headerView, { opacity: navbarOpacity }]}
        />

        {label && label !== '' && (
          <Animated.Text
            style={[
              styles.headerLabel,
              {
                transform: [
                  { translateY: titleTransformY },
                  { translateX: titleTransformX },
                  { scale: titleScale },
                ],
              },
            ]}>
            {label}
          </Animated.Text>
        )}

        {image && (
          <Animated.Image
            source={image}
            style={[
              styles.headerImage,
              {
                transform: [
                  { translateY: titleTransformY },
                  { translateX: titleTransformX },
                  { scale: titleScale },
                ],
              },
            ]}
          />
        )}

        {typeof goBack !== 'undefined' ? (
          <View style={styles.homeMenu}>
            {Back(goBack, Images.icons.LongBack, '#000')}
          </View>
        ) : (
          <View style={styles.homeMenu}>{Menu()}</View>
        )}

        {right && (
          <Animated.View
            style={[
              styles.headerRight,
              { transform: [{ translateY: titleTransformY }] },
            ]}>
            {right}
          </Animated.View>
        )}
      </View>
    )
  }
}
