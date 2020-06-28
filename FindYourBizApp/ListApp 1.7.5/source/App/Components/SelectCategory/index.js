/** @format */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images, Tools, Config, Languages } from '@common'
import styles from './style'
import CategoriesModal from '../CategoriesModal'

class SelectCategory extends PureComponent {
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
    let { style, categories, required } = this.props
    let { itemSelected } = this.state
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          style={[styles.wrapper, required && styles.required]}
          onPress={this.show}>
          {itemSelected != '' ? (
            <View style={styles.row}>
              <Image
                source={{
                  uri: Tools.getImage(itemSelected, Config.PostImage.medium),
                }}
                style={styles.iconLeft}
              />
              <Text style={styles.name}>{itemSelected.name}</Text>
            </View>
          ) : (
            <Text style={styles.name}>{Languages.category}</Text>
          )}
          <Image source={Images.DownArrowIcon} style={styles.icon} />
        </TouchableOpacity>

        <CategoriesModal
          ref="modal"
          onChange={this.onChange}
          categories={categories}
        />
      </View>
    )
  }

  onChange = (itemSelected) => {
    this.setState({ itemSelected })
    this.props.onSelectCategory(itemSelected)
  }
}

export default SelectCategory
