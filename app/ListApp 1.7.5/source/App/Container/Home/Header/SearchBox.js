/** @format */

import React from 'react'
import { TouchableOpacity, Text, Dimensions } from 'react-native'
import { FontAwesome } from 'react-native-vector-icons'

const { width } = Dimensions.get('window')

export default ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.textInputContainer}>
      <FontAwesome
        name="search"
        style={styles.icon}
        color="#4D4D4D"
        size={14}
      />
      <Text style={styles.textInput}>{'Ex: Food service, bar, hotel,...'}</Text>
    </TouchableOpacity>
  )
}
const styles = {
  textInputContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 12,
    mariginHorizontal: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 3,
    width: width - 20,
  },
  icon: {
    marginRight: 15,
  },
  textInput: {
    color: '#4D4D4D',
    fontSize: 13,
  },
}
