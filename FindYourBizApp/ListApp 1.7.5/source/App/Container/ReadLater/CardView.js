/** @format */

'use strict'

import React, { Component } from 'react'
import { Dimensions, View, Platform } from 'react-native'
import css from './styles'
import Card from './Card'
import Toolbar from '@components/Toolbar'
import Carousel from 'react-native-snap-carousel'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100

export default class CardView extends Component {
  renderCard(post, index) {
    if (post != null) {
      return <Card post={post} />
    }
    return null
  }

  render() {
    return (
      <View
        style={Platform.OS === 'android' ? css.bodyCardAndroid : css.bodyCard}>
        <Toolbar name="Read later" cardButton={true} userButton={true} />
        <Carousel
          ref={'carousel'}
          data={this.props.data}
          renderItem={this.renderCard}
          sliderWidth={vw * 75}
          itemWidth={vw * 86}
          slideStyle={css.slide}
        />
      </View>
    )
  }
}
