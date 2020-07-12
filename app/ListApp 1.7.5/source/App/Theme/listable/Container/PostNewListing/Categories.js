/** @format */

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Images, Color, Languages } from '@common'
import { TypeModal } from '@components'

export default class Types extends PureComponent {
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

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color.appColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  iconLeft: {
    width: 16,
    height: 16,
    marginRight: 15,
    resizeMode: 'contain',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  required: {
    borderColor: 'red',
  },
})
