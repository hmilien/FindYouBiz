/** @format */

import React, { Component } from 'react'
import { View, Platform, Dimensions } from 'react-native'

import { Color } from '@common'
import { MapView, Location, Permissions } from '@expo'
const { width, height } = Dimensions.get('window')
import styles from './styles'

import { isEqual } from 'lodash'

const ANCHOR = { x: 0.5, y: 0.5 }
const CENTER = { x: 0, y: 0 }
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class PickMap extends Component {
  constructor(props) {
    super(props)
    this.mounted = false
    this.state = {
      myPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    }
  }
  componentWillMount() {
    this.getMyCurrentLocation()
  }

  async getMyCurrentLocation() {
    this.mounted = true
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      console.error(' to access location was denied')
    } else {
      this.watchLocation()
    }
  }

  async watchLocation() {
    if (Platform.OS === 'ios') {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const myLastPosition = this.state.myPosition
          const myPosition = position.coords
          if (!isEqual(myPosition, myLastPosition)) {
            this.setState({
              myPosition: {
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ASPECT_RATIO,
              },
            })
            this.props.onPickMap(this.state.myPosition)
          }
        },
        null,
        this.props.geolocationOptions
      )
    } else {
      Location.getCurrentPositionAsync({}).then((position) => {
        const myLastPosition = this.state.myPosition
        const myPosition = position.coords
        if (!isEqual(myPosition, myLastPosition)) {
          this.setState({
            myPosition: {
              latitude: myPosition.latitude,
              longitude: myPosition.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922 * ASPECT_RATIO,
            },
          })
          // console.warn(this.state.myPosition)
          this.props.onPickMap(this.state.myPosition)
        }
      })
    }
  }

  _onDragEnd = ({ nativeEvent }) => {
    this.setState({
      myPosition: {
        ...this.state.myPosition,
        latitude:
          nativeEvent.coordinate != null ? nativeEvent.coordinate.latitude : 0,
        longitude:
          nativeEvent.coordinate != null ? nativeEvent.coordinate.longitude : 0,
      },
    })
    this.props.onPickMap(this.state.myPosition)
  }

  render() {
    return (
      <View style={[styles.containerPick]}>
        <MapView
          style={[styles.mapPick]}
          ref={(ref) => (this.map = ref)}
          loadingEnabled
          showsUserLocation={true}
          // region={this.state.myPosition}
          userLocationAnnotationTitle={"You're Here"}
          loadingIndicatorColor={Color.map.loading}>
          <MapView.Marker
            anchor={ANCHOR}
            centerOffset={CENTER}
            pinColor={Color.map.defaultPinColor}
            coordinate={this.state.myPosition}
            style={[styles.marker]}
            onDragEnd={this._onDragEnd}
            draggable
          />
        </MapView>
      </View>
    )
  }
}
