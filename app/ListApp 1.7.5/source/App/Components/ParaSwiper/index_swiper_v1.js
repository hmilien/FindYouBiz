/** @format */

import React from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native'

import Swiper from 'react-native-swiper'
import { Events, Images } from '@common'

import styles from './styles'
const { width } = Dimensions.get('window')

export default class ParaSwiper extends React.Component {
  myCustomAnimatedValue = new Animated.Value(0)

  getPageTransformStyle = (index) => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8),
          ],
          outputRange: ['180deg', '0deg', '-180deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  })

  _openImage = (post, index) => {
    Events.openPhotoClick({ post, index, isMedia: false })
  }

  render() {
    const { post, autoplay, loop, isListable } = this.props
    const data = post.gallery_images
    !data && (
      <Image
        source={Images.imageHolderBooking}
        style={styles.backgroundImage}
      />
    )
    return (
      <Swiper
        ref={(ref) => (this.swiper = ref)}
        dot={<View style={styles.dot} />}
        autoplay={autoplay ? autoplay : true}
        loop={loop ? loop : true}
        activeDot={<View style={styles.dotActive} />}
        paginationStyle={{ bottom: 10, right: 0 }}>
        {data &&
          data.map((item, index) => {
            let imageURL = item
            if (isListable) {
              imageURL =
                typeof item.sizes.thumbnail.url != 'undefined'
                  ? item.sizes.thumbnail.url
                  : item.sizes.thumbnail.source_url
            }
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => this._openImage(post, index)}
                style={styles.image}>
                <Image key={index}
                  defaultSource={Images.imageHolderBooking}
                  style={styles.image}
                  source={{ uri: imageURL }}
                />
              </TouchableOpacity>
            )
          })}
      </Swiper>
    )
  }
}
