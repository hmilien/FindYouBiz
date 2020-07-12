/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image } from 'react-native'
import { Languages, Images } from '@common'
import Button from '@components/Button'
import styles from './styles'
import { Back } from '@navigation/Icons'

const PaymentEmpty = ({ onViewHome, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerLabel}>{Languages.Cart}</Text>
        <View style={styles.homeMenu}>{Back(() => navigation.goBack())}</View>
      </View>
      <View style={styles.contentEmpty}>
        <View>
          <Image
            source={Images.icons.iconCart}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>{Languages.ShoppingCartIsEmpty}</Text>
        <Text style={styles.message}>{Languages.AddProductToCart}</Text>
      </View>

      <Button onPress={onViewHome} />
    </View>
  )
}

PaymentEmpty.propTypes = {
  onViewHome: PropTypes.func.isRequired,
}

export default PaymentEmpty
