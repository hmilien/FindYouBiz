/** @format */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Languages, Constants, Color, Events, warn } from '@common'
import { Ionicons, FontAwesome } from 'react-native-vector-icons'
import styles from './styles'
import { Hideo } from 'react-native-textinput-effects'

export default class PickerPerson extends Component {
  constructor() {
    super()
    this.state = {
      person: 1,
    }
  }

  upPerson = async () => {
    if (this.state.person.length > Constants.booking.maxLengthPerson) {
      Events.toast(Languages.notNumPersonThanThree)
    }
    await this.setState({ person: Number(this.state.person) + 1 })
    this.props.selectedPerson(this.state.person)
  }

  downPerson = async () => {
    if (this.state.person <= 0) {
      Events.toast(Languages.notMinToZero)
      this.setState({ person: 1 })
    }
    const number = Number(this.state.person) - 1

    await this.setState({ person: number < 0 ? 0 : number })
    this.props.selectedPerson(this.state.person)
  }

  onSubmit = () => this.props.selectedPerson(this.state.person)
  onChangeText = (person) => {
    this.setState({ person: Number(person) })
  }

  render() {
    const hideoInput = (
      <Hideo
        ref={'input'}
        iconClass={FontAwesome}
        iconName={'user'}
        iconColor={'white'}
        iconBackgroundColor={Color.main}
        inputStyle={styles.textInput}
        defaultValue={String(1)}
        value={String(this.state.person)}
        underlineColorAndroid={'transparent'}
        maxLength={Constants.booking.maxLengthPerson}
        label={1}
        keyboardType={'numeric'}
        returnKeyType={'done'}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmit}
      />
    )
    return (
      <View style={styles.wrapper}>
        <Text style={styles.selectCal}>{Languages.selectPersonHeading}</Text>
        <View style={styles.pickers}>
          <Ionicons.Button
            name={'ios-remove-circle'}
            color={'#000'}
            backgroundColor={'transparent'}
            size={30}
            iconStyle={{ backgroundColor: 'transparent' }}
            onPress={this.downPerson}
          />
          {hideoInput}
          <Ionicons.Button
            name={'ios-add-circle'}
            color={'#000'}
            backgroundColor={'transparent'}
            size={30}
            iconStyle={{ backgroundColor: 'transparent' }}
            onPress={this.upPerson}
          />
        </View>
      </View>
    )
  }
}
