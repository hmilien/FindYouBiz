'use strict'
import React, { Component } from 'react'
import ListVideo from './ListVideo'

export default class Videos extends Component {
  render() {
    const { onViewPost, navigation } = this.props
    return <ListVideo onViewPost={onViewPost} navigation={navigation} />
  }
}
