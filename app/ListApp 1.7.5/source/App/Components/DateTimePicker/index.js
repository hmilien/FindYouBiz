/** @format */

import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Config } from '@common'
import moment from 'moment'
import styles from './styles'
export default class DateTimePickerComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      selected: props.textHolder,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    const time = date.getHours() + ':' + date.getMinutes()
    this.setState({ selected: time })
    this.props.selectedTimePicker(moment(date).format('LL'))
    this._hideDateTimePicker()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text style={styles.button}>{this.state.selected.toString()}</Text>
        </TouchableOpacity>

        <DateTimePicker
          mode={'time'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          locale={Config.DateTimePicker.Locale}
        />
      </View>
    )
  }
}
