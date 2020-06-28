/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { MapView, CarouselListing } from '@components'
import styles from './styles';

export default class Map extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <MapView enableSearch {...this.props} />
        <CarouselListing {...this.props} />
      </View>
    )
  }
}
