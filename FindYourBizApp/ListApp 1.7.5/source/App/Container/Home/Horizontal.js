/** @format */

import React, { PureComponent } from 'react'
import { View, Animated, FlatList, RefreshControl } from 'react-native'
import { Config, Constants } from '@common'
import { AdMob, HorizonList, AnimatedToolbar } from '@components'
import { isEmpty } from 'lodash'
import Header from './Header'
import Search from './Search'
import CategoryLinks from './CategoryLinks'
import CategoryIcons from './CategoryIcons'
import CategoryShadow from './CategoryShadow'

import { connect } from 'react-redux'
import { fetchConfig, setActiveCategory, fetchCategories } from '@redux/actions'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class Horizontal extends PureComponent {
  state = { scrollY: new Animated.Value(0), refresh: false }

  componentDidMount() {
    const { listCates, fetchCategories } = this.props

    // if (!listCates || (listCates && isEmpty(listCates))) {
      fetchCategories()
    // }
  }

  showProductsByCategory = (item) => {
    const { setActiveCategory, onViewCategory } = this.props
    setActiveCategory(item.category)
    onViewCategory(item)
  }

  _renderItem = ({ item, index }) => {
    const {
      onShowAll,
      onViewPost,
      onViewSearch,
      onViewCategory,
      goBack,
    } = this.props
    switch (item.component) {
      case Constants.Components.categoryLinks: {
        return (
          <CategoryLinks
            config={item}
            categories={this.props.listCates}
            items={Config.HomeCategories}
            onPress={this.showProductsByCategory}
          />
        )
      }

      case Constants.Components.categoryIcons: {
        return (
          <CategoryIcons
            config={item}
            categories={this.props.listCates}
            items={Config.HomeCategories}
            onPress={this.showProductsByCategory}
          />
        )
      }

      case Constants.Components.categoryShadow: {
        return (
          <CategoryShadow
            config={item}
            categories={this.props.listCates}
            items={Config.HomeCategories}
            onPress={this.showProductsByCategory}
          />
        )
      }
      case Constants.Components.search: {
        return <Search config={item} onPress={onViewSearch} />
      }

      case Constants.Components.admob: {
        return <AdMob />
      }
      default: {
        return (
          <HorizonList
            horizontal
            key={`hlist-${index}`}
            config={item}
            index={index}
            onBack={() => goBack()}
            onShowAll={onShowAll}
            onViewPost={onViewPost}
            onViewCategory={onViewCategory}
          />
        )
      }
    }
  }

  _onRefresh = () => {
    this.props.fetchConfig()
  }

  _renderHeader = () => {
    return Config.Local.BannerHeader && Config.Local.BannerHeader.enable ? (
      <View style={styles.header}>
        <Header
          scrollY={this.state.scrollY}
          onViewSearch={this.props.onViewSearch}
        />
      </View>
    ) : (
      <View />
    )
  }

  render() {
    let onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.state.scrollY,
            },
          },
        },
      ]
      // { useNativeDriver: true }
    )
    let { refresh } = this.state

    return (
      <View
        style={[
          styles.body(
            Config.Local.BannerHeader && Config.Local.BannerHeader.enable
          ),
        ]}>
        {Config.Local.BannerHeader &&
          Config.Local.BannerHeader.showLeftMenu == true && (
            <AnimatedToolbar
              scrollY={this.state.scrollY}
              onViewSearch={this.props.onViewSearch}
              disabledSearch
            />
          )}
        <AnimatedFlatList
          data={this.props.layouts}
          ListHeaderComponent={this._renderHeader}
          contentContainerStyle={styles.scrollView}
          keyExtractor={(layout, index) => `h_${index}`}
          renderItem={this._renderItem}
          scrollEventThrottle={1}
          refreshing={refresh}
          {...{ onScroll }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={this._onRefresh} />
          }
        />
      </View>
    )
  }
}

const styles = {
  scrollView: {
    paddingBottom: 30,
    backgroundColor: '#fff',
    // flexWrap: 'wrap',
    flexDirection: "column",
  },
  body: (headerEnable = false) => ({
    backgroundColor: '#FFF',
    paddingTop: headerEnable ? 0 : 60,
  }),
}

const mapStateToProps = ({ config, categories }) => {
  return {
    layouts: config.horizontalLayout,
    listCates: categories.list,
  }
}
export default connect(
  mapStateToProps,
  { fetchConfig, setActiveCategory, fetchCategories }
)(Horizontal)
