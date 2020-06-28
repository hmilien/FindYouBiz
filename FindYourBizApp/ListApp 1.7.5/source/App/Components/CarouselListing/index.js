/** @format */

import React, { PureComponent } from 'react'
import { View, Platform, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import styles, { sliderWidth, itemWidth } from './styles'
import { Constants, Images, Languages } from '@common'
import { PostLayout, LogoSpinner } from '@components'
import { LinearGradient } from 'expo-linear-gradient'
import { fetchPostMarkers, setRegionMap } from '@redux/actions'
import { connect } from 'react-redux';

class CarouselListing extends PureComponent {
  constructor(props) {
    super(props)
    this.page = 1
    this.defaultList = [
      {
        id: 1,
        title: { rendered: Languages.loading },
        displayAddress: Languages.loading,
        images: [Images.imageHolder],
      },
      {
        id: 2,
        title: { rendered: Languages.loading },
        displayAddress: Languages.loading,
        images: [Images.imageHolder],
      },
      {
        id: 3,
        title: { rendered: Languages.loading },
        displayAddress: Languages.loading,
        images: [Images.imageHolder],
      },
    ]
  }

  componentDidMount() {
    const { fetchPostMarkers } = this.props
    fetchPostMarkers(this.page)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.markers &&
      this.props.markers.length === 0 &&
      nextProps.markers &&
      nextProps.markers.length > 0
    ) {
      this.props.setRegionMap(nextProps.markers[1], 1)
    }
  }

  onViewItem = (index = 1) => {
    const { markers, isSearching, searchMarkers, setRegionMap } = this.props
    if (isSearching) {
      setRegionMap(searchMarkers[index], index)
    } else {
      setRegionMap(markers[index], index)
    }
  }

  onViewPost = (item, index) => this.props.onViewPost(item, index)

  renderItem = ({ item, index = -1 }) => {
    const config = {
      height: 95,
    }
    return (
      <PostLayout
        post={item}
        key={'post-' + index}
        style={styles.item}
        hidePrice
        hideTagLine
        config={config}
        isMap
        onViewPost={() =>
          !this.defaultList.includes(item) && this.onViewPost(item, index)
        }
        layout={Constants.Layout.threeColumn}
      />
    )
  }

  _renderCarouselList = () => {
    const { markers, searchMarkers, isSearching } = this.props
    let list = []
    if (isSearching) {
      if (searchMarkers && searchMarkers.length > 0) {
        list = searchMarkers
      }
    } else {
      list =
        typeof markers !== 'undefined' && markers.length !== 0
          ? markers
          : this.defaultList
    }

    if (list && list.length > 0) {
      return (
        <Carousel
          ref={(c) => {
            this._carousel = c
          }}
          onSnapToItem={this.onViewItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.9}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContainer}
          showsHorizontalScrollIndicator={false}
          snapOnAndroid
          firstItem={1}
          enableMomentum
          apparitionDelay={0}
          // removeClippedSubviews={false}
          renderItem={this.renderItem}
          data={list}
        />
      )
    }

    // render no result
    return (
      <View>
        <Text style={styles.noResult}>{Languages.noResult}</Text>
      </View>
    )
  }

  render() {
    const { isFetching } = this.props

    return (
      <View>
        {isFetching ? <LogoSpinner /> : this._renderCarouselList()}
        {Platform.OS !== 'android' && (
          <LinearGradient
            style={styles.linear}
            end={{ x: 0, y: 0 }}
            start={{ x: 0, y: 1.0 }}
            colors={[
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 0.85)',
              'rgba(255, 255, 255, 0.1)',
            ]}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ map }) => {
  return {
    markers: map.markers,
    searchMarkers: map.searchMarkers,
    isFetching: map.isFetching,
    isSearching: map.isSearching,
  }
}
export default connect(
  mapStateToProps,
  { fetchPostMarkers, setRegionMap }
)(CarouselListing)
