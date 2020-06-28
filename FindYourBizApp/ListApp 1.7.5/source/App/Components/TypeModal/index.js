/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { Images, Tools, Languages } from '@common'
import styles from './style'

class TypeModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      selectedIndex: 0,
    }
  }

  show = () => {
    this.setState({ modalVisible: true })
  }

  hide = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    let { list, label } = this.props
    if (list == undefined || list.length == 0) {
      return <View />
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View style={styles.background}>
            <View style={styles.content}>
              <Text style={styles.title}>
                {label ? label : Languages.listingType}
              </Text>
              <View style={styles.separator} />
              {list.map((item, index) => this.renderItem(item, index))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderItem = (item, index) => {
    let { selectedIndex } = this.state
    let title =
      typeof item.title != 'undefined'
        ? item.title.rendered
        : typeof item.name != 'undefined'
        ? item.name
        : ''
    return (
      <TouchableOpacity
        key={index}
        style={[styles.item, selectedIndex == index && styles.selected]}
        onPress={() => this.onPressItem(index)}
        activeOpacity={0.85}>
        <Image
          source={Images.icons.iconTag}
          defaultSource={Images.imageHolder}
          style={[styles.icon, selectedIndex == index && styles.selectedIcon]}
        />
        <Text
          style={[styles.text, selectedIndex == index && styles.selectedText]}>
          {Tools.formatText(title)}
        </Text>
      </TouchableOpacity>
    )
  }

  onPressItem = (index) => {
    const { list } = this.props
    this.setState({ selectedIndex: index })
    this.props.onChange(list[index])
    this.hide()
  }
}

export default TypeModal
