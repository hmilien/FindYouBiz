/** @format */

import React, { PureComponent } from 'react'
import { FlatList, Text, Animated, TouchableOpacity, View } from 'react-native'
import { Config, Constants, Languages, Images, Tools } from '@common'
import { fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'

import {
  BannerImage,
  SlideItem,
  AdMob,
  PostList,
  AnimatedHeader,
  PostLayout,
} from '@components'
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient'
// import console = require('console');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class HorizonList extends PureComponent {
  state = { scrollY: new Animated.Value(0) }

  constructor(props) {
    super(props)
    this.page = 1
    this.defaultList = [
      {
        id: 1,
        name: Languages.loading,
        title: { rendered: 'Loading...' },
        content: 'Loading...',
        images: [Images.imageHolder],
      },
      {
        id: 2,
        name: Languages.loading,
        title: { rendered: 'Loading...' },
        content: 'Loading...',
        images: [Images.imageHolder],
      },
      {
        id: 3,
        name: Languages.loading,
        title: { rendered: 'Loading...' },
        content: 'Loading...',
        images: [Images.imageHolder],
      },
    ]
  }

  componentDidMount() {
    this.fetchPost()
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(
      item,
      index,
      this.props.index,
      this.props.config.component,
      this.props.layouts.list
    )
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.refresh && this.fetchPost()
  }

  fetchPost = () => {
    const { config, index, fetchPosts } = this.props

    if (typeof config !== 'undefined') {
      const { component, categories, types, tags, regions } = config
      fetchPosts(this.page, component, categories, types, tags, regions, index)
    } else {
      fetchPosts(this.page)
    }
  }

  nextPosts = () => {
    this.page += 1
    !this.props.layouts.finish && this.fetchPost()
  }

  viewAll = () => {
    const { index, config, onShowAll } = this.props
    onShowAll({ index, config, isFromHome: true })
  }

  renderItem = ({ item, index }) => {
    const { layouts, horizontal, config } = this.props
    const { layout, textColor, row } = config

    const list =
      typeof layouts.list !== 'undefined' && layouts.list !== 0
        ? layouts.list
        : this.defaultList
    const numOfLine = row || 1
    const newIndex = index * numOfLine

    // if (newIndex + numOfLine > list.length) return <View />

    const isFlexibleColumn =
      layout == Constants.Layout.threeColumn ||
      layout == Constants.Layout.column ||
      layout == Constants.Layout.flexColumn
    const newLayout =
      !horizontal && isFlexibleColumn ? Constants.Layout.twoColumn : layout

    return (
      <View>
        {Array.apply(0, Array(numOfLine)).map((_, index) => {
          const item = list[newIndex + index]

          return (
            <PostLayout
              post={item}
              key={`post-${index}`}
              config={config}
              textColor={textColor}
              scrollY={this.props.scrollY}
              onViewPost={() =>
                !this.defaultList.includes(item) &&
                this.onViewPost(item, newIndex + index)
              }
              layout={Number(newLayout)}
            />
          )
        })}
      </View>
    )
  }

  renderHeader = () => {
    const { config } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.header}
        onPress={this.viewAll}>
        <Text
          style={[
            styles.headerText,
            config.textColor && { color: config.textColor },
          ]}>
          {Tools.formatText(config.name)}
        </Text>
        <Icon
          style={styles.icon}
          color={config.textColor ? config.textColor : '#999'}
          size={22}
          name="chevron-small-right"
        />
      </TouchableOpacity>
    )
  }
  renderDescription = () => {
    const { config, isFromHome } = this.props
    return (
      <Text
        style={[
          styles.headerDesc,
          config.textColor && { color: config.textColor },
          isFromHome && { marginTop: 40 },
        ]}>
        {config.description}
      </Text>
    )
  }

  renderAnimatedHeader = () => {
    const { config, goBack } = this.props

    return (
      <AnimatedHeader
        goBack={goBack}
        label={config.name}
        scrollY={this.state.scrollY}
      />
    )
  }

  keyExtractor = (item, index) => `${index}`

  render() {
    const { layouts, isFromHome, horizontal, config } = this.props
    const isPaging = !!(typeof config !== 'undefined' && config.paging == 1)
    const { VerticalLayout } = Config.Local

    if (typeof layouts === 'undefined') return <View />

    const list =
      typeof layouts.list !== 'undefined' && layouts.list !== 0
        ? layouts.list
        : this.defaultList

    if (typeof list === 'undefined' || list.length === 0) return <View />

    if (horizontal === true) {
      switch (config.layout) {
        case Constants.Layout.bannerSlider:
          const items = list.slice(0, config.limit || 5)
          return (
            <SlideItem
              items={items}
              config={config}
              onViewPost={this.onViewPost}
            />
          )
        case Constants.Layout.bannerImage:
          return <BannerImage config={config} viewAll={this.viewAll} />
      }
    }

    return (
      <View
        style={[
          styles.flatWrap,
          config.color && { backgroundColor: config.bgColor },
        ]}>
        {config.backgroundColor && !config.isFromHome && (
          <LinearGradient
            style={styles.linear}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={config.backgroundColor}
          />
        )}
        {!horizontal && this.renderAnimatedHeader()}
        {typeof config.name !== 'undefined' &&
          config.name !== '' &&
          horizontal &&
          this.renderHeader()}

        {typeof config.description !== 'undefined' &&
          config.description !== '' &&
          horizontal &&
          this.renderDescription()}

        <AnimatedFlatList
          contentContainerStyle={[styles.hList, !horizontal && styles.vList]}
          data={list}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={!horizontal}
          horizontal={horizontal}
          pagingEnabled={horizontal && isPaging}
          onEndReached={!horizontal && this.nextPosts}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />
        {typeof VerticalLayout !== 'undefined' && !isFromHome && horizontal && (
          <PostList
            layout={VerticalLayout.layout}
            showHeader
            headerLabel={VerticalLayout.name}
            onViewPost={this.onViewPost}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ homeLayout }, ownProp) => {
  const index = ownProp.index
  return { layouts: homeLayout[index] }
}

export default connect(
  mapStateToProps,
  { fetchPosts, setActiveCategory }
)(HorizonList)
