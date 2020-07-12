/** @format */

import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import { Constants, Tools } from '@common'
import styles from './style'
import { ParaSwiper } from '@components'

class DetailHeaderListing extends PureComponent {
  render() {
    let { post, scrollY, style } = this.props
    const title = Tools.formatText(post.title.rendered)

    const { bannerHeight } = Constants.Window
    const translateY = scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    })

    const scale = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.5, 1],
      extrapolate: 'clamp',
    })

    const topViewOpacity = scrollY.interpolate({
      inputRange: [0, bannerHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    const titleOpacity = scrollY.interpolate({
      inputRange: [0, 200, bannerHeight],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    })

    const imageOpacity = scrollY.interpolate({
      inputRange: [
        0,
        Constants.Window.bannerHeight / 2,
        Constants.Window.bannerHeight,
      ],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })

    const titleTranslateY = scrollY.interpolate({
      inputRange: [200, bannerHeight],
      outputRange: [0, 35],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View
        style={[
          styles.container,
          style,
          { transform: [{ translateY: translateY }, { scale }] },
        ]}>
        <Animated.View style={[{ flex: 1, opacity: imageOpacity }]}>
          <ParaSwiper {...this.props} />
        </Animated.View>

        {/* <Animated.Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.fixedTitle,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}>
          {title}
        </Animated.Text> */}
      </Animated.View>
    )
  }
}

export default DetailHeaderListing
