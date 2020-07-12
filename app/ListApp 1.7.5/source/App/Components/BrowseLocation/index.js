/** @format */

import React from 'react'
import { View, Animated, TouchableOpacity, Image, Text } from 'react-native'
import { Color, Images, Languages } from '@common'
import styles from './styles'

const BrowseLocation = ({ onViewMap }) => {
  return (
    <Animated.View style={[styles.wrap]}>
      <TouchableOpacity style={styles.rowWrap} onPress={onViewMap}>
        <View style={styles.row}>
          <Image
            source={require('../../../assets/Images/icon-map.png')}
            style={[styles.imgLocation, {tintColor: Color.main}]}
          />

          <Text style={styles.textLocation}>{Languages.browseNearBy} </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default BrowseLocation
