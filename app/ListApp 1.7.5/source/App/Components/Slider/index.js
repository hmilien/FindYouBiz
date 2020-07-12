'use strict'
import React, { Component } from 'react'
import { View, Text, Slider, AsyncStorage } from 'react-native'
import css from './style'
import Tools from '@common/Tools'
import Constants from '@common/Constants'

export default class SliderControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.defaultValue,
      fontSizeMin: Constants.fontText.fontSizeMin,
      fontSizeMax: Constants.fontText.fontSizeMax,
      step: 1,
    }

    Tools.getFontSizePostDetail().then(data => {
      if (data.toString() == 'NaN') {
        data = Constants.fontText.size
      }

      this.defaultValue = data
      this.setState({
        value: this.defaultValue,
        defaultValue: this.defaultValue,
      })
    })
  }

  completeSliding() {
    try {
      AsyncStorage.setItem('@setting_fontSize', this.state.value.toString())
      // console.log('save font size', this.state.value);
    } catch (error) {
      // console.log("Error: " + error);
    }
  }

  render() {
    if (typeof this.state.value != 'undefined') {
      return (
        <View>
          <Text style={css.text}>{this.state.value}</Text>
          <Slider
            minimumValue={this.state.fontSizeMin}
            maximumValue={this.state.fontSizeMax}
            value={this.state.defaultValue}
            onValueChange={value => this.setState({ value: value })}
            onSlidingComplete={this.completeSliding.bind(this)}
            step={this.state.step}
          />
        </View>
      )
    }
    return null
  }
}
