/** @format */

'use strict'
import React, { Component } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import css from '@common/style'
import { warn } from '@common'
import { ImageCache } from '@components'

export default class IconImage extends Component {
  render() {
    const { action, cssImage, image } = this.props

    const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }
    return (
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={action}
        style={[css.imageIconView, this.props.css]}>
        {typeof image != 'number' ? (
          <ImageCache source={image} style={[css.imageIcon, cssImage]} />
        ) : (
          <Animated.Image
            source={image}
            style={[css.imageIcon, cssImage]}
            {...this.props}
          />
        )}
      </TouchableOpacity>
    )
  }
}
