/** @format */

import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Languages, Device } from '@common'
import { AnimatedHeader, TagSelect } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class FilterModal extends React.PureComponent {
  state = { scrollY: new Animated.Value(0) }
  componentDidMount() {
    const { clearSearchPosts, selectedList } = this.props
    const { fetchListingCategories, fetchListingRegions } = this.props
    fetchListingCategories() // get Cates
    fetchListingRegions()

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

    let regions =
      typeof this.refs.Regions != 'undefined' &&
      this.refs.Regions.getWrappedInstance().refs.tag.itemsSelected

    if (this._check(cates)) {
      cates = cates.map((item) => {
        return item.id
      })
      cates = cates.join()
    }
    if (this._check(regions)) {
      regions = regions.map((item) => {
        return item.id
      })
      regions = regions.join()
    }
    // warn([cates, tags, types, regions])
    this.props.searchPosts(this.isMap, '', cates, null, null, regions, null)
    this._goBack()
  }

  _clear = () => this.props.clearSearchPosts()
  _goBack = () => this.props.navigation.goBack()

  render() {
    const { categories, regionsList, selectedList } = this.props

    return (
      <View style={[{ flex: 1 }, Device.isIphoneX && { paddingTop: 30 }]}>
        <AnimatedHeader
          goBack={this._goBack}
          label={Languages.search}
          scrollY={this.state.scrollY}
        />
        <ScrollView contentContainerStyle={styles.all}>
          <TagSelect
            ref={'Cates'}
            label={'Categories'}
            defaults={selectedList.filter((item) => item.type == 'Categories')}
            onItemPress={this._onItemPress}
            list={categories}
          />

          <TagSelect
            ref={'Regions'}
            label={'Regions'}
            defaults={selectedList}
            onItemPress={this._onItemPress}
            list={regionsList}
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
    selectedList: listingTags.selected,
    regionsList: listingTags.regions,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchListingCategories,
    fetchListingRegions,
    searchPosts,
    selectedSearch,
    clearSearchPosts,
  } = require('@redux/actions')
  return {
    fetchListingCategories: () => dispatch(fetchListingCategories()),
    fetchListingRegions: () => dispatch(fetchListingRegions()),
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
