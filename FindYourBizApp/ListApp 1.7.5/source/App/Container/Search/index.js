/** @format */

import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Constants, Languages } from '@common'
import { PostLayout, SearchBar } from '@components'
import styles from './styles'
import {
  searchPosts,
  stopSearchPosts,
  fetchPostRecent,
  fetchCategories,
  setActiveCategory,
  selectedSearch,
  clearSearchPosts,
} from '@redux/actions'
import { connect } from 'react-redux'
import DefaultSearch from './DefaultSearch'
import IconIO from 'react-native-vector-icons/Ionicons'

class Search extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    listSearch: [],
  }

  componentDidMount() {
    const {
      fetchPostRecent,
      fetchCategories,
      listCategories,
      listPosts,
    } = this.props
    if (listCategories && listCategories.length === 0) {
      fetchCategories()
    }
    if (listPosts && listPosts.length === 0) {
      fetchPostRecent()
    }
  }

  _onSearch = (isMap, text) => {
    this.props.searchPosts(isMap, text)
  }

  _stopSearch = () => {
    this.props.stopSearchPosts()
  }

  _showCategory = (category) => {
    const { setActiveCategory, onViewCategory } = this.props
    setActiveCategory(category.id)
    onViewCategory(category)
  }

  _onViewPost = (item, index, isCategory) => {
    if (isCategory) {
      this._showCategory(item)
    } else {
      this.props.onViewPost(item, index)
    }
  }

  _closeSearch = () => {
    const { clearSearchPosts, stopSearchPosts } = this.props
    clearSearchPosts()
    stopSearchPosts()
  }

  _renderHeader = () => {
    const { selected } = this.props
    const hitSlop = { top: 25, right: 25, left: 25, bottom: 25 }
    if (typeof selected != 'undefined' && selected.length > 0) {
      return (
        <View style={styles.filters}>
          <Text style={styles.txtFilter}>{Languages.filter}</Text>
          {selected.map((item, index) => {
            return (
              <Text style={styles.txtText}>
                {item.name + (index != item.length ? ', ' : '')}
              </Text>
            )
          })}
          <TouchableOpacity
            style={styles.closeWrap}
            hitSlop={hitSlop}
            onPress={this._closeSearch}>
            <IconIO
              style={styles.btnCloseSearch}
              hitSlop={hitSlop}
              name={'ios-close-circle'}
              size={20}
              color={'#000'}
              backgroundColor="transparent"
            />
          </TouchableOpacity>
        </View>
      )
    }
    return <View />
  }

  _keyExtractor = (item, index) => index.toString()

  _renderNoResult = () => {
    return (
      <View style={styles.msgWrap}>
        <Text style={styles.msg}>{Languages.noResult}</Text>
      </View>
    )
  }

  _renderContent = () => {
    const { searched, isFetchingSearch, listSearch } = this.props

    if (searched && listSearch && listSearch.length > 0) {
      return (
        <FlatList
          data={listSearch}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader}
          renderItem={({ item, index }) => (
            <PostLayout
              post={item}
              onViewPost={() => this._onViewPost(item, index)}
              layout={Constants.Layout.list}
            />
          )}
        />
      )
    } else if (searched && !isFetchingSearch && listSearch.length == 0) {
      return this._renderNoResult()
    }

    return <DefaultSearch {...this.props} onView={this._onViewPost} />
  }

  render() {
    const { onViewMap, onViewFilter } = this.props

    return (
      <View style={styles.container}>
        <SearchBar
          style={styles.searchBar}
          stopSearch={this._stopSearch}
          onSwitchView={onViewMap}
          onSearch={this._onSearch}
          onViewFilter={onViewFilter}
        />
        {this._renderContent()}
      </View>
    )
  }
}

const mapStateToProps = ({ posts, categories, listingTags }) => {
  return {
    listPosts: posts.list,
    listSearch: posts.postsInSearch,
    listCategories: categories.list,
    isFetchingSearch: posts.isFetchingSearch,
    searched: posts.isSearched,
    isFetchingCategory: categories.isFetching,
    selected: listingTags.selected,
  }
}
export default connect(
  mapStateToProps,
  {
    searchPosts,
    stopSearchPosts,
    fetchPostRecent,
    fetchCategories,
    setActiveCategory,
    selectedSearch,
    clearSearchPosts,
  }
)(Search)
