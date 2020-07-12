/** @format */

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Config } from '@common'
import { connect } from 'react-redux'
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob'
import css from './style'

class Index extends PureComponent {
  componentWillUnmount() {
    // AdMobInterstitial.removeAllListeners()
  }

  showInterstital() {
    // AdMobInterstitial.showAd((error) => error && console.log(error))
  }

  interstitialDidClose() {
    // AdMobInterstitial.requestAd((error) => error && console.log(error))
  }

  render() {
    const { unitID, deviceID } = this.props.General.AdMob
    return (
      <View style={css.body}>
        <AdMobBanner
          ref={(component) => (this._root = component)}
          bannerSize="fullBanner"
          testDeviceID={
            __DEV__
              ? 'EMULATOR'
              : typeof deviceID !== 'undefined'
                ? deviceID
                : Config.AdMob.deviceID
          }
          adUnitID={
            typeof unitID !== 'undefined' ? unitID : Config.AdMob.unitID
          }
        />
      </View>
    )
  }
}

const mapStateToProps = ({ config }) => {
  return {
    General: config.general,
  }
}
export default connect(mapStateToProps)(Index)
