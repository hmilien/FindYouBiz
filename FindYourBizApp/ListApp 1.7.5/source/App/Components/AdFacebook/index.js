/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import css from './style'
import { FacebookAds } from '@expo'

export default class AdFacebook extends PureComponent {
  static defaultProps = {
    type: 'large',
  }

  render() {
    const { type, placementId } = this.props
    return (
      <View style={css.wrap}>
        <FacebookAds.BannerAd
          type={type}
          onClick={() => {}}
          onError={(err) => {}}
          placementId={placementId}
        />
      </View>
    )
  }
}
