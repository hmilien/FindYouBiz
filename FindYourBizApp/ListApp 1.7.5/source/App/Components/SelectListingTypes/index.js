/** @format */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images, Languages } from '@common'
import styles from './style'
import TypeModal from '../TypeModal'

class SelectListingTypes extends PureComponent {
  state = {
    itemSelected: '',
  }

  show = () => {
    this.refs.modal.show()
  }

  hide = () => {
    this.refs.modal.hide()
  }

  render() {
    let { style, list, required } = this.props
    let { itemSelected } = this.state

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={[styles.wrapper, required && styles.required]}
          onPress={this.show}>
          {itemSelected != '' ? (
            <View style={styles.row}>
              <Image source={Images.icons.iconTag} style={styles.iconLeft} />
              <Text style={styles.name}>
                {typeof itemSelected.title != 'undefined'
                  ? itemSelected.title.rendered
                  : typeof itemSelected.name != 'undefined'
                  ? itemSelected.name
                  : ''}
              </Text>
            </View>
          ) : (
            <Text style={styles.name}>{Languages.jobType}</Text>
          )}
          <Image source={Images.DownArrowIcon} style={styles.icon} />
        </TouchableOpacity>

        <TypeModal
          ref="modal"
          label={Languages.jobType}
          onChange={this.onChange}
          list={list}
        />
      </View>
    )
  }

  onChange = (itemSelected) => {
    this.setState({ itemSelected })
    this.props.onSelectType(itemSelected)
  }
}

export default SelectListingTypes
