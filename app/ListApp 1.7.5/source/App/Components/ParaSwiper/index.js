/** @format */

import React, { PureComponent } from 'react'
import { ScrollView, View, Image, Dimensions, Text } from 'react-native'
import { Config, Images, Tools } from '@common'
import styles from './styles'
import { isObject, isArray } from 'lodash'
// import console = require('console');
const { width } = Dimensions.get('window')

export default class ParaSwiper extends PureComponent {
  _renderItem = (imageURL, index) => (
    <View style={styles.imageView} key={index}>
      <Image
        key={'img' + index}
        defaultSource={Images.imageHolderBooking}
        style={styles.image}
        source={{
          uri: imageURL,
        }}
      />
    </View>
  )
  _renderContent = (data) => {
    let result = []
    if (isArray(data)) {
      data.map((item, index) => {
        let imageURL = isObject(item) ? data[index] : item
        result.push(this._renderItem(imageURL, index))
      })
    } else if (isObject(data)) {
      Object.keys(data).forEach((k) =>
        result.push(this._renderItem(data[k], k))
      )
    }
    return result.map((item) => item)
  }

  render() {
    const { post } = this.props
    const data = post.gallery_images
    // console.warn([typeof data, data])
    if (!data || (data && data.length == 0)) {
      const imageURL = Tools.getImage(post, Config.PostImage.large)
      return (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: imageURL }}
            defaultSource={Images.imageHolderBooking}
            style={styles.image}
          />
        </View>
      )
    }

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 30}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        horizontal={true}>
        {this._renderContent(data)}
      </ScrollView>
    )
  }
}
