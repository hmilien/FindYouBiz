import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'

import { Constants, Color } from '@common'
import { connect } from 'react-redux'
import { changeLayout } from '@redux/actions'

export default class Item extends Component {
  changeLayout(layout) {
    this.props.changeLayout(layout)
    this.props.close()
  }

  render() {
    const { posts, layout, image, text } = this.props

    let postLayout = posts.layout
    if (typeof postLayout == 'undefined') {
      postLayout = Constants.Layout.advance
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.rowView}
        onPress={this.changeLayout.bind(this, layout)}
      >
        <View style={[styles.row, postLayout === layout && styles.rowActive]}>
          <Image
            source={image}
            style={[
              styles.imageIcon,
              postLayout === layout && { tintColor: Color.tabbarTint },
            ]}
          />
          <Text
            style={[
              styles.text,
              postLayout === layout && styles.imageIconActive,
            ]}
          >
            {' '}
            {text}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
const mapStateToProps = ({ posts }) => ({ posts })
module.exports = connect(mapStateToProps, { changeLayout })(Item)
