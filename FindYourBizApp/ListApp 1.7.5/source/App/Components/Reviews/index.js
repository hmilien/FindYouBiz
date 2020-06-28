/** @format */

import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome'
import { Languages, Events, Color } from '@common'
import Review from './Review'
import styles from './styles'

export default class Index extends Component {
  render() {
    const { post } = this.props
    const reviews =
      typeof post != 'undefined' && post._embedded != undefined
        ? post._embedded.replies != undefined && post._embedded.replies
        : []

    if (reviews.length === 0) return <View />

    return reviews.length > 0 ? (
      <View style={styles.wrap}>
        <View style={styles.head}>
          <View style={styles.headLeft}>
            <Text style={styles.textHeadLeft}>{Languages.reviews}</Text>
          </View>
        </View>
        {typeof reviews[0] != 'undefined' &&
          reviews[0].map((item, index) => <Review key={index} item={item} />)}
        <TouchableOpacity
          onPress={() => Events.openCommentModal({ post })}
          style={styles.rowReview}>
          <View style={styles.wrapIconReview}>
            <IconFA size={12} name="star" color={Color.activeReview} />
          </View>
          <View style={styles.boxTextReview}>
            <Text style={styles.reviewText}>{Languages.writeReview}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    )
  }
}
