/** @format */

'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Color } from '@common'
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  icon: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
  },
  numberWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    height: 18,
    minWidth: 18,
    backgroundColor: Color.main,
    borderRadius: 9,
  },
  number: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
})

class Index extends Component {
  render() {
    const {
      iconStatic,
      bookmark,
      isBookMark,
      cartIcon,
      carts,
      icon,
      tintColor,
      css,
      cssView
    } = this.props

    const numberWrap = (number = 0) => (
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    )

    return (
      <View style={[styles.container,  cssView && cssView]}>
       <Image
          source={iconStatic ? iconStatic : { uri: icon }}
          style={[styles.icon, css, { tintColor: tintColor }]}
        />
        {isBookMark && bookmark.length > 0 && numberWrap(bookmark.length || 0)}
        {cartIcon && carts.total > 0 && numberWrap(carts.total || 0)}
      </View>
    )
  }
}

const mapStateToProps = ({ bookmark, carts }) => ({
  bookmark: bookmark.posts,
  carts,
})
export default connect(mapStateToProps)(Index)
