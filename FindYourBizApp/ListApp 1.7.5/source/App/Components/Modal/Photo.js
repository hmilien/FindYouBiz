/** @format */

import React, { PureComponent } from 'react'
import { View, Modal, Dimensions } from 'react-native'
import styles from './styles'
import { Events, Config, Tools } from '@common'
import { connect } from 'react-redux'
import { CloseButton, ImageCache } from '@components'
const { width } = Dimensions.get('window')

import Carousel from 'react-native-snap-carousel'
const { width: viewportWidth } = Dimensions.get('window')

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideWidth = wp(85)
const itemHorizontalMargin = wp(2)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2

class PhotoModal extends PureComponent {
  state = { isMedia: false, post: {}, index: 0, visible: false }

  componentWillMount() {
    Events.onOpenPhotoClick(this.openPhoto)
  }

  openPhoto = ({ post, index, isMedia }) => {
    this.setState({ isMedia, index, post, visible: true })
  }

  closeModal = () => this.setState({ visible: false })

  renderItem = ({ item, index }) => {
    let image
    if (this.state.isMedia) {
      image = Tools.getImage(item, Config.PostImage.full)
    } else {
      image = item
    }

    return (
      <View style={styles.slideInnerContainer}>
        <ImageCache source={{ uri: image }} style={styles.image} />
      </View>
    )
  }

  getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  })

  render() {
    const list = this.state.isMedia
      ? this.props.list
      : this.state.post.gallery_images
    return (
      <Modal
        visible={this.state.visible}
        animationType={'slide'}
        onRequestClose={() => this.closeModal}>
        <Carousel
          layout={'stack'}
          layoutCardOffset={18}
          renderItem={this.renderItem}
          firstItem={this.state.index}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={0.4}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContainer}
          removeClippedSubviews={false}
          loop={true}
          data={typeof list != 'undefined' ? list : []}
        />
        <CloseButton
          onPress={this.closeModal}
          style={styles.iconZoomPhoto}
          {...this.props}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ list: posts.photos })
export default connect(mapStateToProps)(PhotoModal)
