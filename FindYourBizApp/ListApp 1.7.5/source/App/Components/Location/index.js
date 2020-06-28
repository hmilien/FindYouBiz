/** @format */

import React from 'react'
import { View, Platform, TouchableOpacity, Animated } from 'react-native'
import styles from './styles'
import { Permissions, Constants, Location } from '@expo'

export default class Index extends React.Component {
  state = {
    location: '',
    errorMessage: '',
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this._getLocationAsync()
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    Location.reverseGeocodeAsync(location.coords).then((address) => {
      let result = ''
      street =
        address[0].street == null ? '' : (result += address[0].street + ', ')
      city = address[0].city == null ? '' : (result += address[0].city + ', ')
      region =
        address[0].region == null ? '' : (result += address[0].region + ', ')
      country = address[0].country == null ? '' : (result += address[0].country)
      this.setState({
        location: result,
      })
    })
  }

  render() {
    const { isMapUser, color, hideMapCurrent, onPressRight } = this.props

    let text = '...'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = this.state.location
    }

    return (
      <View style={[styles.wrap, isMapUser && styles.wrapListing]}>
        {!hideMapCurrent && (
          <TouchableOpacity style={styles.row} onPress={onPressRight}>
            <Animated.Text
              numberOfLines={1}
              style={[styles.textLocation, { color }]}>
              {text}
            </Animated.Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
