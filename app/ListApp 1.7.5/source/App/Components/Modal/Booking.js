/** @format */

import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Events, Config, Tools, Languages, Color, warn, Images } from '@common'
import { ModalBox, Button, Spinkit, PickerPerson, Calendar } from '@components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { addCartItem } from '@redux/actions'
import { WooWorker, WPAPI, Api } from '@services'
import styles from './styles'
import { Ionicons } from 'react-native-vector-icons'

class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.getDate = null
    this.persons = 1
    this.state = {
      loading: false,
      post: '',
      product: null,
      isComplete: false,
      showPicker: false,
    }
  }

  componentWillMount() {
    this.modalBookingClick = Events.onOpenBookingModal(this.open.bind(this))
  }

  componentWillUnMount() {
    this.modalBookingClick.remove()
  }

  open = (post) => {
    this.setState({ post })
    if (typeof this.refs.modal != 'undefined') {
      this.refs.modal.openModal()
    }
  }

  close = () => this.refs.modal.closeModalLayout()

  isValidForm = () => {
    let valid = true
    if (
      !this.getDate ||
      typeof this.getDate == 'undefined' ||
      this.getDate == null
    ) {
      valid = false
      Events.toast(Languages.noChosenDate)
    }
    if (
      !this.getTimeStart ||
      typeof this.getTimeStart == 'undefined' ||
      this.getTimeStart == null
    ) {
      valid = false
      Events.toast(Languages.noTimeStart)
    }
    if (
      !this.getTimeEnd ||
      typeof this.getTimeEnd == 'undefined' ||
      this.getTimeEnd == null
    ) {
      valid = false
      Events.toast(Languages.noTimeEnd)
    }
    return valid
  }

  bookingBack = async () => {
    this.setState({ loading: true })
    if (this.isValidForm()) {
      const { post } = this.state
      const { data } = this.props.user
      let currentPostId = typeof post != 'undefined' ? post.id : 0
      if (data != null) {
        //fetch to get ProductId the same with post listing current
        let product = await WPAPI.getJobListing().id(currentPostId)
        let featureImage = Tools.getImage(post, Config.PostImage.full)
        let name = product.title.rendered
        let productId = product.link_to_product[0]
        let d = new Date()
        let dateBooking =
          d.getDate() +
          '/' +
          d.getMonth() +
          '/' +
          d.getFullYear() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes()
        let payload = {
          customer_id: data.id,
          set_paid: false,
          customer_note: null,
          billing:
            (data.billing.email != '' && data.billing.first_name != '') ||
            data.billing.last_name != ''
              ? data.billing
              : {
                  ...data.billing,
                  email: data.email,
                  first_name: data.first_name,
                  last_name: data.last_name,
                },
          shipping: data.shipping,
          line_items: [
            {
              product_id: productId,
              quantity: 1,
              meta_data: [
                {
                  key: Languages.BookingFeatureImage,
                  value: currentPostId + '|' + featureImage,
                },
                {
                  key: Languages.BookingPlace,
                  value: name,
                },
                {
                  key: Languages.BookingDate,
                  value: dateBooking,
                },
                {
                  key: Languages.BookingNumOfPersons,
                  value: this.getPerson,
                },
                {
                  key: Languages.BookingDateStart,
                  value: this.getDate.startDate.format('LL'),
                },
                {
                  key: Languages.BookingDateEnd,
                  value: this.getDate.endDate.format('LL'),
                },
                {
                  key: Languages.textStart,
                  value: this.getTimeStart,
                },
                {
                  key: Languages.textEnd,
                  value: this.getTimeEnd,
                },
              ],
            },
          ],
        }
        //Get Date
        WooWorker.createNewOrder(payload, (order) => {
          let persons = {}
          persons[productId] = this.getPerson ? this.getPerson : 1
          let booking = {
            productId,
            persons,
            date_start: this.getDate.startDate.format('LL'),
            date_end: this.getDate.endDate.format('LL'),
          }
          Api.createPost(data, booking, order.id)
            .then((response) => {
              //After that, update BookingID to linking with orderID
              WooWorker.setBookingID(order.id, response.post.id, (result) => {
                this.setState({ loading: false, isComplete: true })
              })
            })
            .catch((err) => warn(['err', err]))
        }).catch((err) => warn(err))
        // After that, create a new Post
      } else {
        // Isn't Login
        this.props.onLogIn()
        this.setState({ loading: false })
      }
      // End check UserLogined
    } else {
      // case for form not a valid
      this.setState({ loading: false })
    }
  }

  _addToCart = (product) => {
    const { addCartItem, onViewCart } = this.props
    const d = new Date()
    const dateBooking = `${d.getDate()}/${d.getMonth()}${Number(
      1
    )}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    let metaData = []
    metaData.push(
      {
        key: Languages.BookingDate,
        value: dateBooking,
      },
      {
        key: Languages.BookingNumOfPersons,
        value: this.getPerson,
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

    addCartItem(product, null, metaData)
    onViewCart()
  }

  _booking = () => {
    const { post } = this.state
    if (this.isValidForm()) {
      if (
        typeof post.link_to_product !== 'undefined' &&
        post.link_to_product != '' &&
        post.link_to_product.length > 0
      ) {
        WPAPI.getJobListing()
          .id(post.id)
          .then((product) => {
            WooWorker.getProductId(product.link_to_product[0])
              .then((response) => {
                this._addToCart(response)
              })
              .catch((err) => console.error(err))
          })
      } else {
        Events.toast("You can't book this product")
      }
    } else {
      // case for form not a valid
      this.setState({ loading: false })
    }
  }

  render() {
    const renderBooking = () => {
      const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }
      return (
        <TouchableOpacity
          style={styles.wrapReserve}
          hitSlop={hitSlop}
          onPress={this._booking}>
          {this.state.loading ? (
            <Spinkit color={'#FFF'} />
          ) : (
            <Text style={styles.textReserve}>{Languages.booking}</Text>
          )}
          <Image
            source={{ uri: Images.icons.next }}
            style={[styles.imgReverse, { tintColor: '#FFF' }]}
          />
        </TouchableOpacity>
      )
    }

    const renderThanks = () => (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="ios-checkmark-circle" size={80} color={Color.main} />
        </View>
        <Text style={styles.title}>{Languages.ThankYou}</Text>
        <Text style={styles.message}>{Languages.FinishOrder}</Text>
        <Button
          text={Languages.viewMyBookings}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            this.close()
            this.props.goToBooking()
          }}
        />
      </View>
    )

    return (
      <ModalBox noSwipe isBooking css={[styles.boxFilter]} ref={'modal'}>
        <KeyboardAwareScrollView>
          <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
            {!this.state.isComplete && (
              <Calendar
                key={'comp-' + 1}
                selectedDate={(date) => (this.getDate = date)}
                selectedTimeStart={(timeStart) => {
                  this.getTimeStart = timeStart
                  this.setState({ showPicker: true })
                }}
                selectedTimeEnd={(timeEnd) => (this.getTimeEnd = timeEnd)}
              />
            )}

            {this.state.showPicker && (
              <PickerPerson
                key={'comp-' + 2}
                selectedPerson={(person) => (this.getPerson = person)}
              />
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
        {!this.state.isComplete && renderBooking()}
      </ModalBox>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(
  mapStateToProps,
  { addCartItem }
)(BookingModal)
