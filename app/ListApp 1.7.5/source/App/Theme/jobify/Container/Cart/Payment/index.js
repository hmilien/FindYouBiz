/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, Dimensions, View } from 'react-native'
import css from '@cart/styles'
import { connect } from 'react-redux'
import { CartButton } from '@components'
import { Languages, Config, Images, Events } from '@common'
import Buttons from '@cart/Buttons'
import { WooWorker } from 'api-ecommerce'
import HTML from 'react-native-render-html'
import { fetchPayments, cleanOldCoupon, emptyCart } from '@redux/actions'

import styles from './styles'

const { width } = Dimensions.get('window')

class PaymentOptions extends PureComponent {
  static propTypes = {
    fetchPayments: PropTypes.func,
    message: PropTypes.array,
    type: PropTypes.string,
    cleanOldCoupon: PropTypes.func,
    onNext: PropTypes.func,
    user: PropTypes.object,
    userInfo: PropTypes.object,
    // currency: PropTypes.any,
    payments: PropTypes.object,
    // isLoading: PropTypes.bool,
    cartItems: PropTypes.any,
    onShowCheckOut: PropTypes.func,
    emptyCart: PropTypes.func,
    couponCode: PropTypes.any,
    // couponId: PropTypes.any,
    couponAmount: PropTypes.any,
    shippingMethod: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      // token: null,
      selectedIndex: 0,
      // accountNumber: '',
      // holderName: '',
      // expirationDate: '',
      // securityCode: '',
      // paymentState: '',
      // createdOrder: {},
    }
  }

  componentWillMount() {
    this.props.fetchPayments()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.length > 0) {
      // Alert.alert(Languages.Error, nextProps.carts.message)
      Events.toast(nextProps.message)
    }

    if (
      nextProps.type !== this.props.type &&
      nextProps.type == 'CREATE_NEW_ORDER_SUCCESS'
    ) {
      this.props.cleanOldCoupon()
      this.props.onNext()
    }
  }

  nextStep = () => {
    const { customerInfo, cartItems, user } = this.props
    // const coupon = this.getCouponInfo();
    // const shippingMethod = this.getShippingMethod();
    const lineItems = this.getItemsCart()
    const { list } = this.props.payments
    // console.log([customerInfo, cartItems, user])
    const payload = {
      customer_id: user.data.id ? user.data.id : user.data.userId,
      token: user.data.token ? user.data.token : user.data.jwtToken,
      line_items: lineItems,
      shipping: {
        address_1: customerInfo.address_1,
        address_2: '',
        city: customerInfo.city,
        country: customerInfo.country,
        state: customerInfo.state,
        phone: customerInfo.phone,
        postal_code: customerInfo.postcode,
        full_name: `${customerInfo.first_name} ${customerInfo.last_name}`,
        company: '',
        tax_number: '',
      },
      shipping_lines: [],
      coupon_lines: this.getCouponInfo(),
      billing: {
        address_1: customerInfo.address_1,
        address_2: '',
        city: customerInfo.city,
        country: customerInfo.country,
        state: customerInfo.state,
        phone: customerInfo.phone,
        first_name: customerInfo.first_name,
        last_name: customerInfo.last_name,
        postcode: customerInfo.postcode,
        state: customerInfo.state,
        full_name: `${customerInfo.first_name} ${customerInfo.last_name}`,
        email: customerInfo.email,
        company: '',
        tax_number: '',
      },
      payment_method: list[this.state.selectedIndex].id,
      payment_method_title: list[this.state.selectedIndex].title,
      // shipping_method_id: shippingMethod.id,
      // email: customerInfo.email,
      // mobile: customerInfo.mobile,
      // comments:
      //   typeof customerInfo.note !== 'undefined' ? customerInfo.note : '',
    }

    if (list[this.state.selectedIndex].id === 'cod') {
      this.setState({ loading: true })
      WooWorker.createNewOrder(
        payload,
        (json) => {
          this.setState({ loading: false })
          this.props.emptyCart()
          this.props.onNext()
        },
        (error) => {
          this.setState({ loading: false })
        }
      )
    } else if (list[this.state.selectedIndex].id === 'paypal') {
      payload.payment_method = 'paypal'
      payload.payment_method_title = Languages.Paypal

      this.setState({ loading: true })
      // warn('coming')
      WooWorker.createNewOrder(
        payload,
        (json) => {
          this.setState({ loading: false })
          this.props.onShowCheckOut(json)
        },
        (error) => {
          this.setState({ loading: false })
        }
      )
    } else {
      this.props.onShowCheckOut(payload)
    }
  }

  getItemsCart = () => {
    const { cartItems } = this.props
    const items = []
    for (let i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i]

      const item = {
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
        meta_data: cartItem.metaData,
      }

      if (cartItem.variation != null) {
        item.variation_id = cartItem.variation.id
      }
      items.push(item)
    }
    return items
  }

  getCouponInfo = () => {
    const { couponCode, couponAmount } = this.props
    if (
      typeof couponCode !== 'undefined' &&
      typeof couponAmount !== 'undefined' &&
      couponAmount > 0
    ) {
      return [
        {
          code: couponCode,
        },
      ]
    }
    return {}
  }

  getShippingMethod = () => {
    const { shippingMethod } = this.props

    if (typeof shippingMethod !== 'undefined') {
      return [
        {
          method_id: `${shippingMethod.method_id}:${shippingMethod.id}`,
          method_title: shippingMethod.title,
          total:
            shippingMethod.id == 'free_shipping' ||
            shippingMethod.method_id == 'free_shipping'
              ? '0'
              : shippingMethod.settings.cost.value,
        },
      ]
    }
    // return the free class as default
    return [
      {
        method_id: 'free_shipping',
        total: '0',
      },
    ]
  }

  renderDesLayout = (item) => {
    if (typeof item === 'undefined') {
      return <View />
    }
    if (item.description == null || item.description == '') return <View />

    const tagsStyles = {
      p: {
        color: '#666',
        flex: 1,
        textAlign: 'center',
        width: width - 40,
        paddingLeft: 20,
      },
    }
    return (
      <View style={styles.descriptionView}>
        <HTML tagsStyles={tagsStyles} html={`<p>${item.description}</p>`} />
      </View>
    )
  }

  render() {
    const { list } = this.props.payments
    return (
      <View style={styles.container}>
        <View>
          <View style={css.rowEmpty}>
            <Text style={styles.label}>{Languages.SelectPayment}:</Text>
          </View>

          <View style={styles.paymentOption}>
            {list.map((item, index) => {
              // disable default wc-booking-gateway payment
              if (
                !item.enabled ||
                item.id === 'wc-booking-gateway'
                //||
                // item.id !== 'paypal'
              )
                return null

              const image =
                typeof Config.Payments[item.id] !== 'undefined' &&
                Config.Payments[item.id]

              return (
                <View style={styles.optionContainer} key={index}>
                  <CartButton
                    type="image"
                    source={image}
                    defaultSource={Images.defaultPayment}
                    onPress={() => this.setState({ selectedIndex: index })}
                    buttonStyle={[
                      styles.btnOption,
                      this.state.selectedIndex == index &&
                        styles.selectedBtnOption,
                    ]}
                    imageStyle={styles.imgOption}
                  />
                </View>
              )
            })}
          </View>
          {this.renderDesLayout(list[this.state.selectedIndex])}
        </View>
        <Buttons
          isAbsolute
          onPrevious={this.props.onPrevious}
          isLoading={this.state.loading}
          nextText={Languages.ConfirmOrder}
          onNext={this.nextStep}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ payments, carts, user, products, currency }) => {
  return {
    payments,
    user,
    type: carts.type,
    cartItems: carts.cartItems,
    totalPrice: carts.totalPrice,
    message: carts.message,
    customerInfo: carts.customerInfo,

    // couponCode: products.coupon && products.coupon.code,
    // couponAmount: products.coupon && products.coupon.amount,
    // discountType: products.coupon && products.coupon.type,
    // couponId: products.coupon && products.coupon.id,

    shippingMethod: carts.shippingMethod,
    currency,
  }
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchPayments,
    cleanOldCoupon,
    emptyCart,
  } = require('@redux/actions')
  return {
    fetchPayments: () => dispatch(fetchPayments()),
    cleanOldCoupon: () => dispatch(cleanOldCoupon()),
    emptyCart: () => dispatch(emptyCart()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentOptions)
