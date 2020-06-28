/** @format */

import React, { PureComponent } from 'react'
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native'
import { Tools, Languages } from '@common'
import ChangeQuantity from '@components/ChangeQuantity'
import { addCartItem, removeCartItem } from '@redux/actions'
import { connect } from 'react-redux'
import styles from './styles'

class ProductItem extends PureComponent {
  onChangeQuantity = (quantity) => {
    if (this.props.quantity < quantity) {
      this.props.addCartItem(this.props.product, this.props.variation)
    } else {
      this.props.removeCartItem(this.props.product, this.props.variation)
    }
  }

  render() {
    const {
      product,
      quantity,
      metaData,
      viewQuantity,
      variation,
      onPress,
    } = this.props
    // warn(metaData);
    const imageUrl =
      product && product.images
        ? product.images[0].src
        : Tools.getImage(product)
    const price =
      variation === null || variation === undefined
        ? product.price
        : variation.price
    const title = product.name

    // const row1 = metaData.filter((item) => item.key == 'Date Booking')
    // const concatRow1 = metaData.filter((item) => item.key == 'Start')
    // const row2 = metaData.filter((item) => item.key == 'Seat(s)')
    // const row3 = metaData.filter((item) => item.key == 'Listing Name');
    // console.log([row1, concatRow1])
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: Tools.getProductImage(imageUrl, 100) }}
            style={styles.image}
          />
          <View
            style={[
              styles.infoView,
              { width: Dimensions.get('window').width - 180 },
            ]}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.title}>{title}</Text>
              {/*row1.length > 0 &&
                concatRow1.length > 0 && (
                  <Text style={styles.subTitle}>
                    {`${row1[0].value} ${concatRow1[0].value}`}
                  </Text>
                )}
              {row2.length > 0 && (
                <Text style={styles.subTitle}>{row2[0].value}</Text>
              )*/}
              {/*<Text style={styles.subTitle}>{row3[0].value}</Text>
              <Text style={styles.subTitle}>{row4[0].value}</Text>*/}
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{Tools.currencyFormatter(price)}</Text>
              {variation &&
                typeof variation.attributes !== 'undefined' &&
                variation.attributes.map((variant) => {
                  return (
                    <Text key={variant.name} style={styles.productVariant}>
                      {variant.option}
                    </Text>
                  )
                })}
            </View>
          </View>
          {viewQuantity && (
            <ChangeQuantity
              style={styles.quantity}
              quantity={quantity}
              onChangeQuantity={this.onChangeQuantity}
            />
          )}
        </View>
      </View>
    )
  }
}

export default connect(
  null,
  { addCartItem, removeCartItem }
)(ProductItem)
