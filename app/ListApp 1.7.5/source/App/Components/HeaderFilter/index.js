'use strict'
import React, { Component } from 'react'
import { TouchableOpacity, Animated, View, Image, Text } from 'react-native'
import styles from './styles'
import { Images, Events, Color, Languages, warn } from '@common'
import { connect } from 'react-redux'

class HeaderFilter extends Component {
  openModalTag = () => {
    Events.openModalTag()
  }

  openModalCategory = () => {
    Events.openModalCategory()
  }

  render() {
    const {
      selectedTag,
      selectedCategory,
      showCategory,
      showTag,
      colorConfig,
    } = this.props

    return (
      <Animated.View style={styles.headerView}>
        <Text style={styles.headerTitle}>{Languages.textFilter}</Text>

        <View style={{ flexDirection: 'row' }}>
          {showTag && (
            <TouchableOpacity onPress={this.openModalTag}>
              <Image
                style={[
                  styles.headerIcons,
                  selectedTag !== null && {
                    tintColor: Color.tabbarTint,
                    opacity: 1,
                  },
                ]}
                source={{ uri: Images.icons.filter }}
              />
            </TouchableOpacity>
          )}

          {showCategory && (
            <TouchableOpacity onPress={this.openModalCategory}>
              <Image
                style={[
                  styles.headerIcons,
                  selectedCategory !== null && {
                    tintColor: Color.tabbarTint,
                    opacity: 1,
                  },
                ]}
                source={{ uri: Images.icons.switch }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    )
  }
}

const mapStateToProps = ({ tags, categories, config }) => {
  return {
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(mapStateToProps)(HeaderFilter)
