/** @format */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Color } from '@common'
import Rating from 'react-native-star-rating'

export default class Index extends Component {
  render() {
    const { value, style, marginLeft, colorStar, maxStars, size } = this.props
    const iconSize = typeof size != 'undefined' ? size : 12

    return (
      <View style={style}>
        {typeof value != 'undefined' && value != '' ? (
          <Rating
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            halfStar={'star-half-o'}
            iconSet={'FontAwesome'}
            maxStars={maxStars ? maxStars : 5}
            starSize={iconSize}
            starStyle={{ marginLeft: marginLeft ? marginLeft : iconSize / 4 }}
            halfStarEnabled
            rating={Number(value)}
            fullStarColor={colorStar ? colorStar : Color.activeReview}
            emptyStarColor={'#ccc'}
          />
        ) : (
          <View />
        )}
      </View>
    )
  }
}
