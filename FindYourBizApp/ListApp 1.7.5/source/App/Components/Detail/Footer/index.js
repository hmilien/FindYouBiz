/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Share,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native'
import { Config, Images, Events, Languages } from '@common'
import { Button } from '@components'
import { connect } from 'react-redux'
import {
  addBookMark,
  removeBookMark,
  addCartItem,
  fetchPostsBookmark,
} from '@redux/actions'
import { WooWorker } from '@services'
import styles from './style'

class DetailFooterListing extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      author: null,
      clicked: false,
    }
  }

  componentDidMount() {
    const { author } = this.props
    if (author && author != null) {
      WooWorker.getCustomerById(this.props.author)
        .then((data) => {
          // console.warn(['author', data])
          this.setState({ author: data })
        })
        .catch((err) => console.err(err))
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const isExists = nextProps.wishlists.find(
      (item) => item.id == this.props.post.id
    )
    this.setState({ clicked: isExists == undefined ? false : true })
  }

  checkExist = () => {
    const isExists = this.props.wishlists.find(
      (item) => item.id == this.props.post.id
    )
    return isExists == undefined ? false : true
  }

  toggleBookMark = async () => {
    const { post } = this.props
    if (!this.checkExist()) {
      await this.props.addBookMark(post)
    } else {
      await this.props.removeBookMark(post)
    }
  }

  _share = () => {
    const { post } = this.props
    Share.share({
      message:
        Platform.OS == 'android'
          ? post.link
          : post.content.replace(/(<([^>]+)>)/gi, ''),
      url: post.link,
      title: post.title.rendered,
    })
  }

  _addToCart = () => {
    const { post, addCartItem, onViewCart } = this.props
    if (
      typeof post.link_to_product !== 'undefined' &&
      post.link_to_product &&
      post.link_to_product != '' &&
      post.link_to_product.length > 0
    ) {
      WooWorker.getProductId(post.link_to_product[0])
        .then((response) => {
          addCartItem(response, null)
          onViewCart()
        })
        .catch((err) => console.error(err))
    } else {
      Events.toast("You can't book this product")
      return
    }
  }

  _call = () => {
    const phone = this.props.post.phone
    const phoneOpen =
      Platform.OS == 'ios' ? `telprompt:${phone}` : `tel:${phone}`
    Linking.canOpenURL(phoneOpen)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneOpen).catch((err) => console.error(err))
        }
      })
      .catch((err) => console.error(['err:', err]))
  }

  _whatsApp = () => {
    const phone = this.props.post.phone
    Linking.openURL(`whatsapp://send?text='hi'&phone=${phone}`)
  }

  render() {
    const { post, onLogin, onChat, user } = this.props
    let { author } = this.state
    // console.warn(['author', author])
    const enableChat =
      typeof author != 'undefined' &&
      author != null &&
      user != null &&
      author.id != user.id
    const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }

    return (
      <View style={styles.bottomView}>
        <Button
          type="image"
          source={Images.icons.iconWhatsapp}
          imageStyle={styles.imageButtonWhatApps}
          buttonStyle={styles.buttonWhatApps}
          onPress={this._whatsApp}
        />
        <View style={styles.buttonContainer}>
          {enableChat && (
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={hitSlop}
              style={styles.withChat}
              onPress={() => onChat(author)}>
              <Text style={styles.chatText}>{Languages.chatWithUs}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonAction}>
            <Button
              type="image"
              source={Images.icons.call}
              imageStyle={styles.imageButton}
              buttonStyle={styles.buttonStyle}
              onPress={this._call}
            />
            <Button
              type="image"
              source={Images.icons.iconSharing}
              imageStyle={styles.imageButton}
              buttonStyle={styles.buttonStyle}
              onPress={this._share}
            />
            <Button
              isAddWishList
              type="image"
              source={Images.icons.iconLoving}
              imageStyle={styles.imageButton}
              buttonStyle={styles.buttonStyle}
              clicked={this.state.clicked}
              onPress={this.toggleBookMark}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => Events.openCommentModal({ post })}>
              <Button
                type="image"
                source={Images.icons.iconChat}
                imageStyle={styles.imageButton}
                buttonStyle={styles.comment}
                onPress={() => Events.openCommentModal({ post })}
              />
              {post.totalReview != '' && post.totalReview != 0 && (
                <View style={styles.topRight}>
                  <Text style={styles.topRightText}>{post.totalReview}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {Config.Booking.enable && post.link_to_product != null && (
            <TouchableOpacity
              hitSlop={hitSlop}
              activeOpacity={0.9}
              onPress={() => {
                // Isn't Login
                if (this.props.user == null) {
                  onLogin()
                } else {
                  this._addToCart()
                }
              }}
              style={styles.rightBooking}>
              <Image
                source={Images.icons.iconBooking}
                style={styles.iconBooking}
              />
              <Text style={styles.textBooking}>{Languages.reserve}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}
const mapStateToProps = ({ user, bookmark }, ownProps) => {
  return {
    user: user.data,
    ...ownProps,
    wishlists: bookmark.posts,
  }
}
export default connect(
  mapStateToProps,
  { fetchPostsBookmark, addBookMark, removeBookMark, addCartItem }
)(DetailFooterListing)
