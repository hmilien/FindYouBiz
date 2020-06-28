/** @format */

import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { warn, Images, Tools } from '@common'
import { Rating } from '@components'
import { WPAPI } from '@services'

import styles from './styles'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
    }
  }
  componentDidMount() {
    const { item } = this.props
    WPAPI.getRating()
      .id(item.id)
      .then((response) => {
        this.setState({ rating: response })
      })
      .catch((err) => warn(err))
  }

  render() {
    const { content, author_name, date, author_avatar_urls } = this.props.item

    const reviewContent =
      typeof content.rendered != 'undefined' ? content.rendered : ''

    return (
      <View style={styles.review}>
        <View style={[styles.row, styles.headReview]}>
          <View style={styles.avatar}>
            <View style={styles.boxAvatar}>
              <Image style={styles.imgAvatar} source={Images.personFlat} />
            </View>
            <View style={styles.desc}>
              <Text style={styles.name}>{author_name}</Text>
              <View style={styles.wrapReview}>
                <Rating
                  size={10}
                  value={this.state.rating}
                  style={styles.rating}
                />
              </View>
              <Text style={styles.time}>
                <TimeAgo time={date} hideAgo={false} />
              </Text>
              <View style={styles.desReview}>
                <Text style={styles.textDes}>
                  {Tools.formatText(reviewContent, 500)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
