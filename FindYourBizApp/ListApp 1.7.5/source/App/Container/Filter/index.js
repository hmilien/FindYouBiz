/** @format */

import React from 'react'
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Languages } from '@common'
import { AnimatedHeader, TagSelect } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class FilterModal extends React.PureComponent {
  state = { scrollY: new Animated.Value(0) }

  componentDidMount() {
    const { clearSearchPosts, selectedList } = this.props
    const {
      fetchListingTags,
      fetchListingCategories,
      fetchListingTypes,
    } = this.props
    fetchListingCategories() // get Cates
    fetchListingTags() // get Tags
    fetchListingTypes() //get Types

    if (selectedList && selectedList.length > 0) {
      clearSearchPosts()
    }
  }

  _onItemPress = (item) => {
    // warn(item)
    const { selectedSearch, selectedList } = this.props
    let index = selectedList.findIndex((i) => i.id == item.id)
    index != -1 ? selectedList.splice(index, 1) : selectedList.push(item)
    selectedSearch(selectedList)
  }

  _check = (val) =>
    typeof val != 'undefined' && val && val.length > 0 ? true : false

  _search = () => {
    let cates =
      typeof this.refs['Cates'] != 'undefined' &&
      this.refs['Cates'].getWrappedInstance().refs['tag'].itemsSelected
    let tags =
      typeof this.refs.Tags != 'undefined' &&
      this.refs.Tags.getWrappedInstance().refs.tag.itemsSelected
    let type =
      typeof this.refs.Types != 'undefined' &&
      this.refs.Types.getWrappedInstance().refs.tag.itemsSelected

    // warn([cates, tags, type])
    if (this._check(cates)) {
      cates = cates.map((item) => {
        return item.id
      })
      cates = cates.join()
    }
    if (this._check(tags)) {
      tags = tags.map((item) => {
        return item.id
      })
      tags = tags.join()
    }
    if (this._check(type)) {
      type = type.map((item) => {
        return item.id
      })
      type = type.join()
    }
    // warn([cates, tags, types, regions])
    this.props.searchPosts(this.isMap, '', cates, tags, type, null, null)
    this.props.goBack()
  }

  _clear = () => this.props.clearSearchPosts()
  _goBack = () => this.props.navigation.goBack()

  render() {
    const { categories, tags, types, selectedList } = this.props

    return (
      <View style={{ flex: 1 }}>
        <AnimatedHeader
          goBack={this._goBack}
          label={Languages.search}
          scrollY={this.state.scrollY}
        />
        <ScrollView
          contentContainerStyle={styles.all}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            // { useNativeDriver: true }
          )}>
          <TagSelect
            ref={'Cates'}
            label={'Categories'}
            defaults={selectedList.filter((item) => item.type == 'Categories')}
            onItemPress={this._onItemPress}
            list={categories}
          />
          <TagSelect
            ref={'Tags'}
            label={'Tags'}
            defaults={selectedList.filter((item) => item.type == 'Tags')}
            onItemPress={this._onItemPress}
            list={tags}
          />
          <TagSelect
            ref={'Types'}
            label={'Types'}
            defaults={selectedList.filter((item) => item.type == 'Types')}
            onItemPress={this._onItemPress}
            list={types}
          />
        </ScrollView>
        <View style={styles.fullSearch}>
          <TouchableOpacity
            style={[styles.btnSearch, styles.btnClear]}
            onPress={this._clear}>
            <Text style={[styles.txtSearch, styles.txtClear]}>
              {Languages.clear}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSearch} onPress={this._search}>
            <Text style={styles.txtSearch}>{Languages.search}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = ({ listingTags, categories }) => {
  return {
    categories: categories.list,
    tags: listingTags.tags,
    types: listingTags.types,
    selectedList: listingTags.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchListingTags,
    fetchListingCategories,
    fetchListingTypes,
    searchPosts,
    selectedSearch,
    clearSearchPosts,
  } = require('@redux/actions')
  return {
    fetchListingTags: () => dispatch(fetchListingTags()),
    fetchListingCategories: () => dispatch(fetchListingCategories()),
    fetchListingTypes: () => dispatch(fetchListingTypes()),
    searchPosts: (isMap, text, cates, tags, type, regions, typeListable) =>
      dispatch(
        searchPosts(isMap, text, cates, tags, type, regions, typeListable)
      ),
    selectedSearch: (items) => dispatch(selectedSearch(items)),
    clearSearchPosts: () => dispatch(clearSearchPosts()),
  }
}
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterModal)
)
