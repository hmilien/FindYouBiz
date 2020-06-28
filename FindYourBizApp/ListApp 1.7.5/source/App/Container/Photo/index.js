/** @format */

import React, { Component } from 'react'
import { FlatList, Animated, View, Platform } from 'react-native'
import { fetchPhotos } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './styles'
import Photo from './Photo'
import { Languages, warn } from '@common'
import { LogoSpinner, AnimatedHeader, FlatButton } from '@components'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class Index extends Component {
  constructor(props) {
    super(props)
    this.page = 1
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.props.fetchPhotos(this.page)
  }

  renderItem = ({ item, index }) => {
    return <Photo photo={item} index={index} />
  }

  nextPosts = () => {
    this.page += 1
    this.props.fetchPhotos(this.page)
  }

  render() {
    const { photos } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <AnimatedHeader label={Languages.photo} scrollY={this.state.scrollY} />
        <AnimatedFlatList
          numColumns={3}
          data={photos}
          contentContainerStyle={
            Platform.OS === 'android' ? styles.listAndroid : styles.listView
          }
          keyExtractor={(item, index) => item.id}
          renderItem={(item, index) => this.renderItem(item, index)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          onEndReached={(e) => e.distanceFromEnd > 100 && this.nextPosts}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    photos: posts.photos,
    isFetching: posts.isFetching,
    error: posts.error,
  }
}
export default connect(mapStateToProps, { fetchPhotos })(Index)
