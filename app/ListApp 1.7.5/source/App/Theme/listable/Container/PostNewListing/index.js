/** @format */

import React, { PureComponent } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import { SelectImage, HeaderPage, PostHeading } from '@components'
import { Languages } from '@common'
import styles from './styles'
import { connect } from 'react-redux'
import Categories from './Categories'

class PostNewListing extends PureComponent {
  state = {
    requiredImg: false,
    requiredTitle: false,
    requiredCategory: false,
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    let { onBack, list } = this.props
    var { requiredImg, requiredTitle, requiredCategory } = this.state

    return (
      <View style={styles.container}>
        <ScrollView>
          <HeaderPage
            onBack={onBack}
            title={Languages.publish}
            hideRightButton={false}
            rightTitle={Languages.next}
            onRightPress={this.next}
          />
          <View style={styles.content}>
            <SelectImage
              required={requiredImg}
              style={styles.selectImage}
              onSelectImage={this.onSelectImage}
            />
            <PostHeading
              required={requiredTitle}
              style={styles.postHeading}
              onChangeText={(title) => (this.title = title)}
            />

            <Categories
              required={requiredCategory}
              list={list}
              onSelectType={this.onSelectType}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  onSelectImage = (imageUri) => {
    this.imageUri = imageUri
  }

  onSelectType = (category) => {
    this.category = category
  }

  next = () => {
    this.setState({
      requiredImg: this.imageUri == undefined,
      requiredTitle: this.title == undefined,
      requiredCategory: this.category == undefined,
    })
    if (
      this.imageUri != undefined &&
      this.title != undefined &&
      this.category != undefined
    ) {
      this.props.next({
        imageUri: this.imageUri,
        title: this.title,
        category: this.category,
      })
    }
  }
}
const mapStateToProps = ({ categories }) => {
  return {
    list: categories.list,
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { fetchCategories } = require('@redux/actions')
  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PostNewListing)
