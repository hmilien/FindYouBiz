/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { Image } from 'react-native'

const ImageCache = ({ source, defaultSource, style }) => {
  return <Image style={style} defaultSource={defaultSource} source={{ uri: source.uri }} />
}

export default ImageCache
