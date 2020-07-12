/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, AsyncStorage} from 'react-native'
import { Languages } from '@common'
import styles from './style'
import Slider from "../Slider";

const fontValues = {
  "8": 0,
  "10": 0.25,
  "12": 0.5,
  "14": 0.75,
  "16": 1
}

class DetailShare extends PureComponent {
  state = {
    isVisible: false,
    value: 0.5
  }

  hide = ()=>{
    this.setState({isVisible: false})
  }

  show = ()=>{
    this.setState({isVisible: true})
  }

  render() {
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={this.hide}>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.backgroundColor}>
                <View style={styles.content}>
                  <View style={styles.wrapper}>
                    <Text style={styles.title}>{Languages.fontSize}</Text>
                    <View style={styles.separator}/>
                    <Slider
                      value={this.state.value}
                      onValueChange={value => this.setState({ value })}/>
                  </View>
                  <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={this.hide}>
                      <Text style={styles.text}>{Languages.cancel}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={this.changeFontSize}>
                      <Text style={styles.text}>{Languages.ok}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    )
  }

  changeFontSize = ()=>{
    let {value} = this.state
    let index = Object.values(fontValues).indexOf(parseFloat(value))
    let fontSize = Object.keys(fontValues)[index]
    AsyncStorage.setItem('@setting_fontSize', fontSize)
    this.props.onChangeFontSize(parseInt(fontSize))
    this.hide()
  }

  componentWillMount(){
    AsyncStorage.getItem('@setting_fontSize', (error,fontSize)=>{
      if (fontSize) {
        let value = fontValues[fontSize]
        this.setState({value})
      }
    })
  }
}

export default DetailShare
