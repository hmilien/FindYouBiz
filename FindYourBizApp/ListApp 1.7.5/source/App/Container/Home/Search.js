/** @format */

import React from 'react'
import { TouchableOpacity, View, Image, Text, Dimensions } from 'react-native'
import { FontAwesome } from 'react-native-vector-icons'
import { Images } from '@common'
const { width } = Dimensions.get('window')

export default ({ config, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.textInputContainer(config.hideRight)}>
        <FontAwesome
          name="search"
          style={styles.icon}
          color="#4D4D4D"
          size={14}
        />
        <Text style={styles.textInput}>{'Search...'}</Text>
      </View>
      {!config.hideRight && (
        <View>
          <Image source={Images.iconAvatar} style={styles.image} />
        </View>
      )}
    </TouchableOpacity>
  )
}
const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: (hideRight = false) => ({
    backgroundColor: '#FFF',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: !hideRight ? 15 : 0,
    borderRadius: 10,
    width: !hideRight ? width - 100 : width - 40,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EAECEF',
  }),
  icon: {
    marginRight: 15,
  },
  textInput: {
    color: '#4D4D4D',
    fontSize: 13,
  },
  image: {
    resizeMode: 'contain',
    width: width / 10,
  },
}
