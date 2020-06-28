/** @format */

'use strict'
import React, { PureComponent } from 'react'
import { Dimensions } from 'react-native'
import { Constants, Config } from '@common'
import Column from './Column'
import List from './List'
import ListRight from './List/Right'
import Card from './Card'
import CardTrend from './Card/Trend'
import CardVertical from './Card/Vertical'
import ReadMore from './ReadMore'
import Banner from './Banner';

const { width } = Dimensions.get('window');

export default class Index extends PureComponent {
  render() {
    const {
      onViewPost,
      style,
      hidePrice,
      hideTagLine,
      hideBookmark,
      config,
      post,
      scrollY,
      isMap,
      textColor,
    } = this.props;

    let imageSize = Config.PostImage.large
    switch (this.props.layout) {
      case Constants.Layout.list:
        return <List viewPost={onViewPost} post={post} />

      case Constants.Layout.listRight:
        return <ListRight viewPost={onViewPost} post={post} />

      case Constants.Layout.card:
        return <Card viewPost={onViewPost} post={post} />

      case Constants.Layout.cardTrend:
        return <CardTrend viewPost={onViewPost} post={post} />

      case Constants.Layout.cardVertical:
        return <CardVertical disabledCates viewPost={onViewPost} post={post} />

      case Constants.Layout.banner:
        return (
          <Banner
            scrollY={scrollY}
            viewPost={onViewPost}
            post={post}
            imageSize={imageSize}
          />
        )

      case Constants.Layout.column:
        return (
          <Column viewPost={onViewPost} post={post} width={300} height={80} />
        )

      case Constants.Layout.twoColumn:
        return (
          <Column
            viewPost={onViewPost}
            post={post}
            width={(width / 2) - 16}
            height={120}
            imageSize={imageSize}
            textColor={textColor}
          />
        )

      case Constants.Layout.flexColumn:
        return (
          <Column
            viewPost={onViewPost}
            post={post}
            width={config.width}
            height={config.height}
            hideBookmark={hideBookmark}
            imageSize={imageSize}
            textColor={textColor}
          />
        )

      case Constants.Layout.threeColumn:
        return (
          <Column
            style={style}
            hidePrice={hidePrice}
            hideTagLine={hideTagLine}
            viewPost={onViewPost}
            post={post}
            isMap={isMap}
            textColor={textColor}
            width={(width / 3) - 15}
            height={typeof config.height !== 'undefined' ? config.height : 100}
            imageSize={imageSize}
          />
        )

      case Constants.Layout.readMore:
        return (
          <ReadMore viewPost={onViewPost} post={post} imageSize={imageSize} />
        )

      default:
        return <List viewPost={onViewPost} post={post} />
    }
  }
}
