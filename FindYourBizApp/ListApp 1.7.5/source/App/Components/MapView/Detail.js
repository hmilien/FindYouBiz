/** @format */

import React, { Component } from 'react'
import { View, Platform, Text, Image, Dimensions } from 'react-native'

import { Color, Tools } from '@common'
import { MapView, WebBrowser } from '@expo'
const { width, height } = Dimensions.get('window')
import styles from './styles'

const ASPECT_RATIO = width / height

export default class MapDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSnapshot: '',
    }
  }

  openMap = () => {
    const { address_lat, address_long } = this.props.post
    let url = `https://maps.apple.com/?ll=${address_lat},${address_long}`
    let urlGG = `https://google.com/maps/place/${address_lat},${address_long}`
    WebBrowser.openBrowserAsync(Platform.OS == 'ios' ? url : urlGG)
  }

  componentDidMount() {
    setTimeout(() => this.marker && this.marker.showCallout(), 1000)
    Platform.OS === 'ios' && this.takeSnapshot()
  }

  // componentWillReceiveProps = (nextProps) => {
  //   if (this.props.post !== nextProps.post) {
  //     this.takeSnapshot()
  //   }
  // }

  renderCalloutMaker = (item) => {
    const name = typeof item.title !== 'undefined' ? item.title.rendered : ''

    return (
      <MapView.Callout>
        <View style={{ width: 100 }}>
          <Text style={styles.title}>{Tools.getDescription(name, 100)}</Text>
        </View>
      </MapView.Callout>
    )
  }

  takeSnapshot() {
    // 'takeSnapshot' takes a config object with the
    // following options
    const {address_lat, address_long} = this.props.post

    this.map &&
      this.map
        .takeSnapshot({
          width: 300, // optional, when omitted the view-width is used
          height: 200, // optional, when omitted the view-height is used
          region: {
            latitude: parseFloat(address_lat),
            longitude: parseFloat(address_long),
            latitudeDelta: 0.00122,
            longitudeDelta: 0.00122 * ASPECT_RATIO,
          }, // iOS only, optional region to render
          format: 'png', // image formats: 'png', 'jpg' (default: 'png')
          quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
          result: 'file', // result types: 'file', 'base64' (default: 'file')
        })
        .then((uri) => {
          this.setState({ mapSnapshot: uri })
        })
  }

  render() {
    const { post, css, cssMap } = this.props

    // fix crashing issue by empty
    if (!post.address_lat || !post.address_long ) {
      return <View />
    }

    return (
      <View style={[styles.containerDetail, css & css]}>
        <MapView
          style={[styles.mapDetail, cssMap && cssMap]}
          ref={(ref) => (this.map = ref)}
          region={{
            latitude: parseFloat(post.address_lat),
            longitude: parseFloat(post.address_long),
            latitudeDelta: 0.00122,
            longitudeDelta: 0.00122 * ASPECT_RATIO,
          }}
          loadingEnabled
          loadingIndicatorColor={Color.map.loading}>
          <MapView.Marker
            ref={(ref) => (this.marker = ref)}
            coordinate={{
              latitude: parseFloat(post.address_lat),
              longitude: parseFloat(post.address_long),
              latitudeDelta: 0.00122,
              longitudeDelta: 0.00122 * ASPECT_RATIO,
            }}
            pinColor={Color.map.defaultPinColor}
            style={[styles.marker]}
          />
          {Platform.OS == 'ios' && (
            <Image
              source={{ uri: this.state.mapSnapshot.uri }}
              style={{ width, flex: 1 }}
            />
          )}
        </MapView>
      </View>
    )
  }
}

MapDetail.defaultProps = {
  enableHack: false,
  geolocationOptions: {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 4000,
  },
}
