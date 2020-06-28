/** @format */

import React, { PureComponent } from 'react'
import { View, Image, TextInput } from 'react-native'
import { Languages, Images } from '@common'
import { PickMap, HeaderPage } from '@components'
import styles from './styles'

export default class PickMapComp extends PureComponent {
  state = {
    requiredMap: false,
    location: '',
  }

  render() {
    let { onBack } = this.props
    return (
      <View style={styles.container}>
        <HeaderPage
          onBack={onBack}
          title={Languages.selectOnLocation}
          hideRightButton={false}
          rightTitle={Languages.next}
          onRightPress={this.next}
        />
        <View stye={styles.boxLocation}>
          <Image source={Images.icons.location} style={styles.icon} />
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={Languages.location + '...'}
            placeholderTextColor="#aaa"
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onChangeText={(text) => this.setState({ location: text })}
          />
        </View>
        <PickMap onBack={onBack} onPickMap={this._onPickMap} />
      </View>
    )
  }

  _onPickMap = (pickMap) => {
    this.pickMap = pickMap
  }

  next = () => {
    let post = {
      ...this.props.navigation.state.params.post,
      location: this.state.location,
    }
    if (this.pickMap != undefined || this.pickMap != {}) {
      this.props.next(post, this.pickMap)
    }
  }
}
