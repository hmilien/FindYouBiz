/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Images, Tools, AppConfig } from '@common'
import { LinearGradient } from 'expo-linear-gradient';

export default class HorizonItemSearch extends PureComponent {
  render() {
    const { onViewPost, data, width, height, styleImage } = this.props
    let imageURL = "";
    if (data.image && data.image[0] !== undefined) {
      let temp = data.image[0].file;
      temp = temp.substring(temp.indexOf('.'), 0)
      let tag = data.image[0].file.split('.').pop()
      imageURL = `${AppConfig.Website.url}/wp-content/uploads/${temp}.${tag}`
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.panel}
        onPress={onViewPost}>
        <Image
          source={{ uri: imageURL }}
          defaultSource={Images.imageHolder}
          style={[
            styles.imagePanel,
            width && { width },
            height && { height },
            styleImage,
          ]}
        />

        <LinearGradient
          style={[styles.linearGradient, width && { width }]}
          colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.5 )']}
        />

        <View style={styles.titleView}>
          <Text style={styles.title}>
            {Tools.getDescription(data.name, 200)}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
