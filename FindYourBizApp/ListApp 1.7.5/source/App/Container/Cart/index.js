/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, ScrollView, View } from 'react-native'
// import ScrollableTabView from 'react-native-scrollable-tab-view'

import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'

import {
  PAYMENT_APPROVED_CODE,
  PAYMENT_CANCELED_CODE,
  PAYMENT_ERROR_CODE,
} from '@services/PayPalAPI'
import { connect } from 'react-redux'
import {
  Languages,
  Events,
  Constants,
  Images,
  AppConfig,
  BlockTimer,
} from '@common'
import Modal from 'react-native-modalbox'
import { StepIndicator, PaypalPanel } from '@components'
import { WooWorker } from 'api-ecommerce'
import base64 from 'base-64'
import { isEmpty, isObject } from 'lodash'
import Theme from '@theme'
import {
  emptyCart,
  fetchAllCountries,
  addCartItem,
  finishOrder,
} from '@redux/actions'

import MyCart from './MyCart'
import Delivery from './Delivery'
import FinishOrder from './FinishOrder'
import PaymentEmpty from './Empty'
import Buttons from './Buttons'
import styles from './styles'

export const OrderStatus = {
  pending: 'pending',
  processing: 'processing',
  onHold: 'on-hold',
  completed: 'completed',
  cancelled: 'cancelled',
  refunded: 'refunded',
  failed: 'failed',
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class Cart extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    onMustLogin: PropTypes.func.isRequired,
    finishOrder: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    onFinishOrder: PropTypes.func.isRequired,
    onViewProduct: PropTypes.func,
    cartItems: PropTypes.array,
    onViewHome: PropTypes.func,
  }

  static defaultProps = {
    cartItems: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      createdOrder: {},
      userInfo: null,
      order: '',
      isLoading: false,
      orderId: null,
      scrollY: new Animated.Value(0),
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ title: Languages.ShoppingCart })
  }

  componentWillReceiveProps(nextProps) {
    // reset current index when update cart item
    if (this.props.cartItems && nextProps.cartItems) {
      if (nextProps.cartItems.length !== 0) {
        if (this.props.cartItems.length !== nextProps.cartItems.length) {
          this.updatePageIndex(0)
          this.onChangeTabIndex(0)
        }
      }
    }
  }

  componentDidMount() {
    const { countries, fetchAllCountries } = this.props
    // if (!countries || (countries && isEmpty(countries.list))) {
      fetchAllCountries()
    // }
  }

  checkUserLogin = () => {
    const { data } = this.props.user
    if (!data) {
      this.props.onMustLogin()
      return false
    }
    return true
  }

  onNext = () => {
    let valid = true;
    switch (this.state.currentIndex) {
      case 0:
        if (!this._isValidForm() || !this.checkUserLogin()) {
          valid = false
        } else {
          this._addMetaToCart()
        }
        break
      default:
        break
    }
    if (valid && typeof this.tabCartView !== 'undefined') {
      const nextPage = this.state.currentIndex + 1
      this.tabCartView.goToPage(nextPage)
    }
  }

  _isValidForm = () => {
    let valid = true
    let err = ''

    if (
      !this.getTimeStart ||
      typeof this.getTimeStart == 'undefined' ||
      this.getTimeStart == null
    ) {
      valid = false
      err = Languages.noTimeStart
    } else if (
      !this.getTimeEnd ||
      typeof this.getTimeEnd == 'undefined' ||
      this.getTimeEnd == null
    ) {
      valid = false
      err = Languages.noTimeEnd
    }
    err != '' && Events.toast(err)
    return valid
  }

  _addMetaToCart = () => {
    const { cartItems, addCartItem } = this.props
    const d = new Date()
    const dateBooking = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    let metaData = []
    metaData.push(
      {
        key: Languages.BookingDate,
        value: dateBooking,
      },
      {
        key: Languages.BookingNumOfPersons,
        value: typeof this.getPerson == 'undefined' ? 1 : this.getPerson,
      },
      {
        key: Languages.BookingDateStart,
        value: this.getTimeStart,
      },
      {
        key: Languages.BookingDateEnd,
        value: this.getTimeEnd,
      }
    )
    addCartItem(cartItems[0].product, null, metaData)
  }

  renderCheckOut = () => {
    const params = base64.encode(
      encodeURIComponent(JSON.stringify(this.state.order))
    )
    // warn(params)
    const userAgentAndroid =
      'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'

    const checkOutUrl = `${AppConfig.Website.url}/${
      Constants.WordPress.checkout
    }?order=${params}`

    return (
      <Modal
        ref={(modal) => (this.checkoutModal = modal)}
        style={styles.modal}
        backdropPressToClose
        backButtonClose={false}
        backdropColor="transparent"
        swipeToClose={false}
        keyboardTopOffset={0}
        onClosed={() => this.completePurchase(this.state.paymentState)}>
        <PaypalPanel
          style={styles.webView}
          order={this.state.order}
          setPaymentStates={(paymentState) => this.setState({ paymentState })}
          userAgent={userAgentAndroid}
          closeModal={this._onClosedModal}
          scalesPageToFit
        />
      </Modal>
    )
  }

  completePurchase = (responseCode) => {
    const orderId = this.state.order.id
    switch (responseCode) {
      case PAYMENT_APPROVED_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.processing, () => {
          this.setState({ isLoading: false })
          this.props.finishOrder()
        })
        break
      case PAYMENT_CANCELED_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.cancelled, () => {
          this.setState({ isLoading: false })
        })
        break
      case PAYMENT_ERROR_CODE:
        WooWorker.setOrderStatus(orderId, OrderStatus.failed, () => {
          this.setState({ isLoading: false })
        })
        break
      default:
    }
  }

  _onClosedModal = () => {
    this.checkoutModal.close()
  }

  onShowCheckOut = async (order) => {
    await this.setState({ order })
    this.checkoutModal.open()
  }

  onPrevious = () => {
    if (this.state.currentIndex == 0) {
      this.props.onBack()
      return
    }
    this.tabCartView.goToPage(this.state.currentIndex - 1)
  }

  updatePageIndex = (page) => {
    this.setState({ currentIndex: isObject(page) ? page.i : page })
  }

  onChangeTabIndex = (page) => {
    if (this.tabCartView) {
      this.tabCartView.goToPage(page)
    }
  }

  finishOrder = () => {
    const { onFinishOrder } = this.props
    onFinishOrder()
    BlockTimer.execute(() => {
      this.tabCartView.goToPage(0)
    }, 1500)
  }

  render() {
    const {
      onViewProduct,
      navigation,
      onBack,
      cartItems,
      onViewHome,
    } = this.props
    const { currentIndex, scrollY } = this.state

    if (currentIndex === 0 && cartItems && cartItems.length === 0) {
      return <PaymentEmpty navigation={navigation} onViewHome={onViewHome} />
    }
    const steps = [
      { label: Languages.MyCart, icon: Images.icons.calendar },
      { label: Languages.Delivery, icon: Images.icons.iconUser },
      { label: Languages.Payment, icon: Images.icons.iconMoney },
      { label: Languages.Complete, icon: Images.icons.iconFlag },
    ]

    return (
      <View style={styles.fill}>
        {/*<HeaderPage
          onBack={this.onPrevious}
          scrollY={scrollY}
          hideRightButton={false}
          rightTitle={Languages.next}
          onRightPress={this.onNext}
          finishOrder={this.finishOrder} 
        />*/}

        <AnimatedScrollView
          style={styles.content}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}>
          {this.renderCheckOut()}
          <View style={styles.indicator}>
            <StepIndicator
              steps={steps}
              onChangeTab={this.onChangeTabIndex}
              currentIndex={currentIndex}
            />
          </View>

          <ScrollableTabView
            ref={(tabView) => {
              this.tabCartView = tabView
            }}
            locked
            onChangeTab={this.updatePageIndex}
            initialPage={0}
            tabBarPosition="overlayTop"
            prerenderingSiblingsNumber={1}
            renderTabBar={() => <View style={{ padding: 0, margin: 0 }} />}>
            <MyCart
              key="cart"
              navigation={navigation}
              onViewProduct={onViewProduct}
              getTimeStart={(getTimeStart) =>
                (this.getTimeStart = getTimeStart)
              }
              getTimeEnd={(getTimeEnd) => (this.getTimeEnd = getTimeEnd)}
              getPerson={(getPerson) => (this.getPerson = getPerson)}
            />

            <Delivery
              key="delivery"
              onNext={(formValues) => {
                this.setState({ userInfo: formValues })
                this.onNext()
              }}
              onPrevious={this.onPrevious}
            />

            <Theme.Payment
              key="payment"
              onPrevious={this.onPrevious}
              onNext={this.onNext}
              userInfo={this.state.userInfo}
              isLoading={this.state.isLoading}
              onShowCheckOut={this.onShowCheckOut}
            />

            <FinishOrder key="finishOrder" finishOrder={this.finishOrder} />
          </ScrollableTabView>

          {currentIndex == 0 && (
            <Buttons onPrevious={this.onPrevious} onNext={this.onNext} />
          )}
        </AnimatedScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ carts, user, countries }) => {
  return {
    user,
    cartItems: carts.cartItems,
    countries: countries.list,
  }
}
export default connect(
  mapStateToProps,
  {
    emptyCart,
    finishOrder,
    addCartItem,
    fetchAllCountries,
  }
)(Cart)
