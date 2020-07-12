/** @format */

import React from 'react'
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Languages, Device } from '@common'
import { AnimatedHeader, TagSelect } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class SearchModal extends React.PureComponent {
  state = { scrollY: new Animated.Value(0) }

  componentDidMount() {
    const { clearSearchPosts, selectedList } = this.props
    const {
      fetchTypes,
      fetchListingRegions,
      fetchListingCategories,
    } = this.props
    fetchTypes() // get Job Types
    fetchListingRegions()
    fetchListingCategories()
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
      typeof this.refs.Cates != 'undefined' &&
      this.refs.Cates.getWrappedInstance().refs.tag.itemsSelected
    let jobTypes =
      typeof this.refs.JobTypes != 'undefined' &&
      this.refs.JobTypes.getWrappedInstance().refs.tag.itemsSelected

    let regions =
      typeof this.refs.Regions != 'undefined' &&
      this.refs.Regions.getWrappedInstance().refs.tag.itemsSelected

    if (this._check(cates)) {
      cates = cates.map((item) => {
        return item.id
      })
      cates = cates.join()
    }
    if (this._check(jobTypes)) {
      jobTypes = jobTypes.map((item) => {
        return item.id
      })
      jobTypes = jobTypes.join()
    }

    if (this._check(regions)) {
      regions = regions.map((item) => {
        return item.id
      })
      regions = regions.join()
    }
    // warn([cates, tags, types, regions])
    this.props.searchPosts(
      this.isMap,
      '',
      cates,
      null, // tags
      jobTypes, // type
      regions, // regions
      null // typeListable
    )
    this._goBack()
  }

  _clear = () => this.props.clearSearchPosts()
  _goBack = () => this.props.navigation.goBack()

  render() {
    const { categories, jobTypes, regions, selectedList } = this.props

    return (
      <View style={[{ flex: 1 }, Device.isIphoneX && { paddingTop: 30 }]}>
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
            ref={'JobTypes'}
            label={'Job Types'}
            defaults={selectedList}
            onItemPress={this._onItemPress}
            list={jobTypes}
          />
          <TagSelect
            ref={'Regions'}
            label={'Regions'}
            defaults={selectedList}
            onItemPress={this._onItemPress}
            list={regions}
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
    jobTypes: listingTags.jobTypes,
    regions: listingTags.regions,
    selectedList: listingTags.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchTypes,
    fetchListingRegions,
    fetchListingCategories,
    searchPosts,
    selectedSearch,
    clearSearchPosts,
  } = require('@redux/actions')
  return {
    fetchTypes: () => dispatch(fetchTypes()),
    fetchListingRegions: () => dispatch(fetchListingRegions()),
    fetchListingCategories: () => dispatch(fetchListingCategories()),
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
  )(SearchModal)
)
