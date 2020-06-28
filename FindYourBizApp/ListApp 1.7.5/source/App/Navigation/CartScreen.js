/** @format */

import React, { PureComponent } from 'react'
import { Cart } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class CartScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerTransparent: true,
  })

  render() {
    const { navigate } = this.props.navigation

    return (
      <SafeAreaView style={{flex: 1}}>
        <Cart
          onMustLogin={() => navigate('login', { onCart: true })}
          onBack={() => navigate('home')}
          onFinishOrder={() => navigate('myOrder')}
          onViewHome={() => navigate('home')}
          onViewProduct={(product) => navigate('postDetail', product)}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    )
  }
}
