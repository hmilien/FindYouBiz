/** @format */

import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import css from '@cart/styles'
import { Calendar, PickerPerson, ProductItem } from '@components'
import { connect } from 'react-redux'
import { SwipeRow } from 'react-native-swipe-list-view'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Languages, Tools } from '@common'
import { removeCartItem } from '@redux/actions'
import styles from './styles'

class MyCart extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderHiddenRow = (rowData, index) => {
    return (
      <TouchableOpacity
        key={`hiddenRow-${index}`}
        style={styles.hiddenRow}
        onPress={() =>
          this.props.removeCartItem(rowData.product, rowData.variation)
        }>
        <View style={{ marginRight: 23 }}>
          <FontAwesome name="trash" size={30} color="white" />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { cartItems, totalPrice } = this.props
    const finalPrice = totalPrice

    return (
      <View style={styles.container}>
        <View>
          <View style={css.row}>
            <Text style={css.label}>{Languages.TotalPrice}</Text>
            <Text style={css.value}>{Tools.currencyFormatter(finalPrice)}</Text>
          </View>
          <View style={styles.list}>
            {cartItems &&
              cartItems.map((item, index) => (
                <SwipeRow
                  key={`cart${index}`}
                  disableRightSwipe
                  leftOpenValue={75}
                  rightOpenValue={-75}>
                  {this.renderHiddenRow(item, index)}
                  <ProductItem
                    key={index}
                    // viewQuantity
                    product={item.product}
                    metaData={item.metaData}
                    onPress={() =>
                      this.props.onViewProduct({ product: item.product })
                    }
                    variation={item.variation}
                    quantity={item.quantity}
                  />
                </SwipeRow>
              ))}
          </View>
          <View style={styles.boxCalendar}>
            <Calendar
              key={'comp-' + 1}
              selectedDate={(date) => (this.getDate = date)}
              selectedTimeStart={(timeStart) =>
                this.props.getTimeStart(timeStart)
              }
              selectedTimeEnd={(timeEnd) => this.props.getTimeEnd(timeEnd)}
            />
            <PickerPerson
              key={'comp-' + 2}
              selectedPerson={(person) => this.props.getPerson(person)}
            />
          </View>
        </View>
      </View>
    )
  }
}

MyCart.defaultProps = {
  couponCode: '',
  couponAmount: 0,
}

const mapStateToProps = ({ carts, products }) => {
  return {
    cartItems: carts.cartItems,
    totalPrice: carts.totalPrice,
  }
}

export default connect(
  mapStateToProps,
  { removeCartItem }
)(MyCart)
