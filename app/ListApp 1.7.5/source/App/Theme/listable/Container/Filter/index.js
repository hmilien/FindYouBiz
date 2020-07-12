/** @format */

import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Languages } from '@common'
import { AnimatedHeader, TagSelect } from '@components'
import styles from './styles'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

class SearchModal extends React.PureComponent {
  state = { scrollY: new Animated.Value(0) }

  componentDidMount() {
    const { clearSearchPosts, selectedList } = this.props
    const { fetchListingCategories, fetchTypesListable } = this.props
    fetchListingCategories() // get Cates
    fetchTypesListable() // get Types
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
    let typeListable =
      typeof this.refs.TypeListable != 'undefined' &&
      this.refs.TypeListable.getWrappedInstance().refs.tag.itemsSelected

    if (this._check(cates)) {
      cates = cates.map((item) => {
        return item.id
      })
      cates = cates.join()
    }
    if (this._check(typeListable)) {
      typeListable = typeListable.map((item) => {
        return item.id
      })
      typeListable = typeListable.join()
    }
    // warn([cates, tags, types, regions])
    this.props.searchPosts(
      this.isMap,
      '',
      cates,
      null, // tags
      null, // type
      null, // regions
      typeListable // typeListable
    )
    this._goBack()
  }

  _clear = () => this.props.clearSearchPosts()
  _goBack = () => this.props.navigation.goBack()

  render() {
    const { categories, types, selectedList } = this.props

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
          {/* --- listable --- */}
          <TagSelect
            ref={'TypeListable'}
            label={'Job Types'}
            defaults={selectedList}
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
    types: listingTags.typesListable,
    selectedList: listingTags.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchListingCategories,
    fetchTypesListable,
    searchPosts,
    selectedSearch,
    clearSearchPosts,
  } = require('@redux/actions')
  return {
    fetchListingCategories: () => dispatch(fetchListingCategories()),
    fetchTypesListable: () => dispatch(fetchTypesListable()),
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
