/** @format */

import React, { PureComponent } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SelectImage, HeaderPage, PostHeading } from '@components'
import { Languages } from '@common'
import styles from './styles'
import { connect } from 'react-redux'
import Types from './Types'

class PostNewListing extends PureComponent {
  state = {
    requiredImg: false,
    requiredTitle: false,
    requiredListingType: false,
  }

  componentDidMount() {
    this.props.fetchListingTypes()
  }

  render() {
    let { onBack, list } = this.props
    var { requiredImg, requiredTitle, requiredListingType } = this.state

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

            <Types
              required={requiredListingType}
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

  onSelectType = (listingType) => {
    this.listingType = listingType
  }

  next = () => {
    this.setState({
      requiredImg: this.imageUri == undefined,
      requiredTitle: this.title == undefined,
      requiredListingType: this.listingType == undefined,
    })
    if (
      this.imageUri != undefined &&
      this.title != undefined &&
      this.listingType != undefined
    ) {
      this.props.next({
        imageUri: this.imageUri,
        title: this.title,
        listingType: this.listingType,
      })
    }
  }
}
const mapStateToProps = ({ listingTags }) => {
  return {
    list: listingTags.types,
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  const { fetchListingTypes } = require('@redux/actions')
  return {
    ...ownProps,
    ...stateProps,
    fetchListingTypes: () => dispatch(fetchListingTypes()),
  }
}
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PostNewListing)
