/** @format */

import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'
import { ModalBox } from '@components'
import { Events } from '@common'
import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'

import { connect } from 'react-redux'

class CategoryModal extends Component {
  constructor(props) {
    super(props)
    this.page = 1
    this.state = { tagActive: null }
  }

  componentDidMount() {
    const { list, fetchCategories } = this.props
    if (list.length == 0) {
      fetchCategories()
    }
    Events.onOpenModalCategory(this.open)
  }

  setActiveCategory(categoryId) {
    const { setActiveCategory } = this.props
    setActiveCategory(categoryId)
    this.fetchPosts(categoryId)
    this.close()
  }

  fetchPosts = (categoryId) => {
    const { fetchPosts, selectedTag } = this.props
    fetchPosts(1, selectedTag, categoryId)
  }

  open = () => this.modal.openModal()

  close = () => this.modal.closeModal()

  render() {
    const { list, selectedCategory } = this.props
    return (
      <ModalBox ref={(modal) => (this.modal = modal)}>
        <View style={styles.flatlistTag}>
          <ScrollView style={styles.scrollModal}>
            <TouchableOpacity
              onPress={() => this.setActiveCategory()}
              style={styles.boxTag}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    styles.textTag,
                    selectedCategory === null && styles.imageIconActive,
                  ]}>
                  {' '}
                  -- All --{' '}
                </Text>
              </View>
            </TouchableOpacity>

            {list.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.setActiveCategory(item.id)}
                  style={styles.boxTag}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        styles.textTag,
                        selectedCategory === item.id && styles.imageIconActive,
                      ]}>
                      {item.name ? item.name : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </ModalBox>
    )
  }
}

const mapStateToProps = ({ tags, categories }) => {
  return {
    list: categories.list,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
  }
}
export default connect(
  mapStateToProps,
  {
    setActiveCategory,
    fetchCategories,
    fetchPosts,
  }
)(CategoryModal)
