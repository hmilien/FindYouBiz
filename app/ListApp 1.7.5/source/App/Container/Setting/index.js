/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, ScrollView, View, } from 'react-native'
import { Slider } from '@components'
import css from './style'
import { Languages } from '@common'
import LangSwitcher from './LangSwitch'

export default class Setting extends Component {

  render() {
    return (
      <ScrollView style={css.wrap}>
        <View style={css.boxSetting}>
          <Text style={css.text}>{Languages.fontSize}:</Text>
          <Slider />
        </View>
        <View style={css.boxSetting}>
          <Text style={css.text}>{Languages.changeLanguage}:</Text>
          <LangSwitcher />
        </View>
      </ScrollView>
    )
  }
}
