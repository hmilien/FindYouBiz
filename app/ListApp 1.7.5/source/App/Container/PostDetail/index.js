/** @format */

import React, { PureComponent } from 'react'
import { View, Dimensions, FlatList } from 'react-native'
import { Modal } from '@components'
import { Constants } from '@common'
import { connect } from 'react-redux'
import News from './News'
import ListingDetail from './ListingDetail';
// import console = require('console');

const { width } = Dimensions.get('window')

class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { pageIndex: props.index }
  }

  getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  })

  renderItem = ({ item, idx }) => {
    const { onViewPost, postList, onBack } = this.props;
    // console.warn(postList)
    return (
      <News
        {...this.props}
        onViewPost={onViewPost}
        relatedPosts={postList.filter((post) => post.id !== item.id)}
        post={item}
        onBack={onBack}
        onNext={this.onNext}
      />
    )
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.index != nextProps.index) {
      this.dropdown &&
        this.dropdown.scrollToIndex({ animated: true, index: nextProps.index })
    }
  }

  keyExtractor = (item, index) => item.id.toString()

  renderContent = () => {
    const {
      index,
      post,
      postList,
      onViewPost,
      onBack,
      onChat,
      onLogin,
      onViewCart,
      component,
    } = this.props
    let { pageIndex } = this.state

    // not support swiper for the type Listing
    if (
      component == Constants.Components.listing ||
      typeof component === 'undefined'
    ) {
      return (
        <ListingDetail
          post={post}
          relatedPosts={
            typeof postList != 'undefined'
              ? postList.filter((item) => item.id !== post.id)
              : []
          }
          onBack={onBack}
          onNext={this.onNext}
          onLogin={onLogin}
          onViewPost={onViewPost}
          onChat={onChat}
          onViewCart={onViewCart}
        />
      )
    }

    return (
      <FlatList
        ref={(ref) => (this.dropdown = ref)}
        data={postList}
        renderItem={this.renderItem}
        horizontal
        pagingEnabled
        getItemLayout={this.getItemLayout}
        // initialScrollIndex={pageIndex}
        keyExtractor={this.keyExtractor}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={({ nativeEvent }) => {
          const page = Math.round(nativeEvent.contentOffset.x / width)
          if (page !== pageIndex) {
            this.setState({ pageIndex: page })
          }
        }}
      />
    )
  }

  render() {
    const { goToBooking, onViewCart, onLogIn } = this.props
    return (
      <View style={{ flex: 1 }}>
        {this.renderContent()}
        <Modal.Booking
          onViewCart={onViewCart}
          goToBooking={goToBooking}
          onLogIn={onLogIn}
        />
        <Modal.Chat />
      </View>
    )
  }
}

const mapStateToProps = ({ homeLayout }, ownProps) => {
  const indexHomeLayout = ownProps.indexHomeLayout
  const index = ownProps.index
  return {
    index,
    isNews: ownProps.component != Constants.Components.news,
    postList:
      typeof indexHomeLayout !== 'undefined'
        ? homeLayout[indexHomeLayout].list
        : [],
  }
}
export default connect(mapStateToProps)(Index)
