import React, { Component } from 'react'

import { Icons } from '@common'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

export default class Index extends Component {
  render() {
    const { name, color, size, style, backgroundColor } = this.props

    return (
      <Icon
        name={name ? name : Icons.iconRating}
        color={color ? color : Icons.iconRatingColor}
        size={size ? size : Icons.iconRatingSizeListing}
        style={styles.iconStar}
        backgroundColor={backgroundColor ? backgroundColor : Icons.iconRatingBG}
      />
    )
  }
}
