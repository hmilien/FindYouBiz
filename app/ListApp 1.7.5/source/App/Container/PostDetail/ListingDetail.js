/** @format */

import React from 'react'
import {
  Text,
  Animated,
  TouchableOpacity,
  Platform,
  View,
  Image,
  Linking,
  BackHandler,
  DeviceEventEmitter,
  ScrollView,
} from 'react-native'
import { WebBrowser } from '@expo'
import { Images, Events, Config, Tools, warn, Languages } from '@common'
import {
  Reviews,
  Rating,
  DetailBack,
  DetailHeader,
  DetailFooter,
} from '@components'
import { connect } from 'react-redux'
import { setRegionMap, fetchPostsBookmark, addCartItem } from '@redux/actions'
import styles from './styles'
import { WooWorker } from 'api-ecommerce'
import Theme from '@theme'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class ListingDetail extends React.Component {
  constructor(props) {
    super(props)
    this.backPressSubscriptions = new Set()
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.id != nextProps.post.id) {
      this._scroll.getNode().scrollTo({
        y: 0,
        animated: false,
      })
    }
  }

  componentDidMount() {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    DeviceEventEmitter.addListener('hardwareBackPress', () => {
      let invokeDefault = true
      const subscriptions = []

      this.backPressSubscriptions.forEach((sub) => subscriptions.push(sub))

      for (let i = 0; i < subscriptions.reverse().length; i += 1) {
        if (subscriptions[i]()) {
          invokeDefault = false
          break
        }
      }

      if (invokeDefault) {
        BackHandler.exitApp()
      }
    })

    this.backPressSubscriptions.add(this.handleHardwareBack)
  }
  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners('hardwareBackPress')
    this.backPressSubscriptions.clear()
  }

  handleHardwareBack = () => {
    /* do your thing */
    this.props.onBack()
    return true
  }

  openWebsite = (url) => {
    let website
    if (url.includes('http')) {
      website = url
    } else {
      website = `http://${url}`
    }

    WebBrowser.openBrowserAsync(website).catch((err) => console.error(err))
  }

  openMap = () => {
    const { address_lat, address_long } = this.props.post
    const url = `http://maps.apple.com/?ll=${address_lat},${address_long}`
    const urlGG = `https://google.com/maps/place/${address_lat},${address_long}`
    WebBrowser.openBrowserAsync(Platform.OS == 'ios' ? url : urlGG)
  }

  openPhone = (phone) => {
    const phoneOpen =
      Platform.OS == 'ios' ? `telprompt:${phone}` : `tel:${phone}`
    Linking.canOpenURL(phoneOpen)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneOpen).catch((err) => warn(err))
        }
      })
      .catch((err) => warn(['err:', err]))
  }

  openTweet = (twitter) => {
    Linking.openURL(`http://twitter.com/${twitter}`)
  }

  _addToCart = () => {
    const { post, addCartItem, onViewCart } = this.props
    if (
      typeof post.link_to_product !== 'undefined' &&
      post.link_to_product != null &&
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
    }
  }

  _renderListingContent = () => {
    const { post, onLogin, relatedPosts, onViewPost } = this.props
    const postTitle =
      typeof post.title.rendered === 'undefined' ? '' : post.title.rendered
    const subTitle = post.company_tagline
    const location = post.location
    const phone = post.phone
    const twitter = post.twitter
    const website = post.company_website
    const price = typeof post.costShow != 'undefined' ? post.costShow : ''
    const review =
      post.totalReview == 0 || post.totalReview === undefined
        ? ''
        : post.totalReview

    return (
      <View style={styles.headAddress}>
        <View style={styles.rowTitle}>
          <Text style={styles.postTitle}>
            {Tools.getDescription(postTitle, 300)}
          </Text>

          {Config.Booking.enable && (
            <View style={styles.aboveBooking}>
              <TouchableOpacity
                style={styles.btnHeadRight}
                onPress={() => {
                  if (this.props.user == null) {
                    onLogin()
                  } else {
                    this._addToCart()
                  }
                }}>
                <Image
                  source={Images.icons.iconBooking}
                  style={[styles.iconBooking, styles.iconHeadRight]}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {price != '' && (
          <View style={styles.wrapPrice}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.currency}>{post.costShow.currency}</Text>
          </View>
        )}
        {review != '' && (
          <View style={styles.wrapReview}>
            <Text style={styles.avgReview}>
              {(post.totalRate / 2).toFixed(1)}
            </Text>
            <Rating
              style={styles.reviewStar}
              value={post.totalRate / 2}
              size={11}
            />
            <Text style={styles.ratingTextSmall}>
              {review + ' '}
              {post.totalReview > 1 ? 'reviews' : 'review'}
            </Text>
          </View>
        )}
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={[styles.boxInfo]}>
          {location != '' && (
            <TouchableOpacity style={styles.row} onPress={this.openMap}>
              <View style={styles.row1}>
                <Image style={styles.imageIcon} source={Images.icons.iconPin} />
                <Text style={styles.label}>{Languages.Address}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text} numberOfLines={2}>
                  {location}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {post.job_hours != '' && (
            <View style={styles.row}>
              <View style={styles.row1}>
                <Image
                  style={styles.imageIcon}
                  source={Images.icons.iconTime}
                />
                <Text style={styles.label}>{Languages.open}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text}>
                  {post.job_hours != '' &&
                    Tools.getDescription(post.job_hours, 400)}
                </Text>
              </View>
            </View>
          )}

          {phone != '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.openPhone(phone)}
              style={[styles.row]}>
              <View style={styles.row1}>
                <Image
                  style={styles.imageIcon}
                  source={Images.icons.iconPhone}
                />
                <Text style={styles.label}>{Languages.tel}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text}>{phone}</Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.line} />

          {twitter != '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.openTweet(twitter)}
              style={styles.row}>
              <View style={styles.row1}>
                <Image
                  style={styles.imageIcon}
                  source={Images.icons.iconTweet}
                />
                <Text style={styles.label}>{Languages.twitter}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text}>{twitter}</Text>
              </View>
            </TouchableOpacity>
          )}

          {website != '' && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.openWebsite(website)}
              style={[styles.row]}>
              <View style={styles.row1}>
                <Image style={styles.imageIcon} source={Images.icons.iconWeb} />
                <Text style={[styles.label]}>{Languages.website}</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.text}>{website}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Theme.ListingDataDetail
          data={Config.ListingData}
          post={post}
          onViewPost={onViewPost}
          general={this.props.general}
          relatedPosts={relatedPosts}
        />
        <Reviews post={post} />
      </View>
    )
  }

  render() {
    const { post, onChat, onBack } = this.props

    let { scrollY } = this.state
    return (
      <View style={styles.container}>
        <AnimatedScrollView
          ref={(sc) => (this._scroll = sc)}
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}>
          <DetailHeader
            {...this.props}
            scrollY={scrollY}
            style={styles.headerTop}
          />

          {this._renderListingContent()}
        </AnimatedScrollView>

        <DetailFooter {...this.props} author={post.author} onChat={onChat} />
        <DetailBack scrollY={scrollY} onBack={onBack} />
      </View>
    )
  }
}

const mapStateToProps = (
  { homeLayout, user, language, bookmark, config },
  ownProps
) => {
  const indexHomeLayout = ownProps.indexHomeLayout
  return {
    postList:
      typeof indexHomeLayout !== 'undefined'
        ? homeLayout[indexHomeLayout].list
        : [],
    user: user.data,
    general: config.general,
    wishlist: bookmark.posts,
    language: language.lang,
  }
}
export default connect(
  mapStateToProps,
  { setRegionMap, fetchPostsBookmark, addCartItem }
)(ListingDetail)
