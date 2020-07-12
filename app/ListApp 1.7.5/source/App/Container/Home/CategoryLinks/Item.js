/** @format */

import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, Dimensions, View, Image } from 'react-native'
import { TouchableScale } from '@components'
import { LinearGradient } from '@expo'
const { width } = Dimensions.get('window')
import { Constants } from '@common'

export default class Item extends PureComponent {
  render() {
    const { item, column, label, onPress, type } = this.props

    if (type == 'image' || typeof type == 'undefined') {
      return (
        <View style={styles.container(column)}>
          <TouchableScale
            scaleTo={0.9}
            style={styles.backgroundLarge}
            onPress={() => onPress({ ...item, circle: true, name: label })}>
            <Image
              source={item.image}
              style={[styles.image]}
              // tintColor={item.colors[0]}
            />
            <Text style={[styles.titleLarge]}>{label}</Text>
          </TouchableScale>
        </View>
      )
    }

    return (
      <View style={styles.container(column)}>
        <TouchableOpacity
          style={styles.wrap}
          activeOpacity={0.75}
          onPress={() => onPress({ ...item, circle: true, name: label })}>
          <LinearGradient colors={item.colors} style={styles.button}>
            <Image source={item.image} style={[styles.icon]} />
          </LinearGradient>
          <Text style={[styles.title, { color: text }]}>{label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: (column = 1) => ({
    paddingLeft: 5,
    paddingRight: 6,
    width: column == 1 ? 134 : width / column,
    marginTop: 20,
    paddingBottom: 30,
  }),

  // image style
  backgroundLarge: {
    backgroundColor: '#fff',
    borderColor: '#CDCDCD',
    borderWidth: 1,

    width: 122,
    height: 120,
    borderRadius: 6,
    marginLeft: 10,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 60,
    resizeMode: 'cover',
  },
  titleLarge: {
    marginTop: 8,
    marginLeft: 8,
    fontSize: 13,
    // textAlign: 'center',
    color: '#464646',
    fontFamily: Constants.fontFamilyBold,
  },

  // icon style
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    alignItems: 'center',
  },
  title: {
    marginTop: 6,
    fontSize: 11,
    // fontFamily: Constants.fontHeader,
    opacity: 0.9,
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 18,
    borderRadius: 10,
  },
}
