/** @format */

import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View, Dimensions, Image } from 'react-native'
import { Constants, Tools } from '@common'
import { TouchableScale } from '@components'
const { width } = Dimensions.get('window')
import { LinearGradient } from '@expo'

class Item extends PureComponent {
  render() {
    const { item, column, label, onPress, type } = this.props

    if (type == 1 || typeof type == 'undefined') {
      return (
        <View style={styles.container(column)}>
          <TouchableScale
            scaleTo={0.7}
            style={styles.wrap}
            onPress={() => onPress({ ...item, circle: true, name: label })}>
            <View
              style={[
                styles.background,
                { opacity: 0.08, backgroundColor: item.colors[0] },
              ]}
            />

            <View style={styles.iconView}>
              <Image
                source={item.icon}
                style={[styles.icon]}
                // tintColor={item.colors[0]}
              />
            </View>
            <Text style={[styles.title]}>{Tools.formatText(label)}</Text>
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
            <Image source={item.icon} style={[styles.icon]} />
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
    width: column == 1 ? 90 : width / column,
    marginTop: 20,
  }),
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

  iconView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 18,
    borderRadius: 10,
  },

  background: {
    backgroundColor: '#f1f1f1',

    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default Item
