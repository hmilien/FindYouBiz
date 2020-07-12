/** @format */

'use strict'

import React, { Component } from 'react'
import { FlatList } from 'react-native'
import styles from './styles'
import { Constants } from '@common'
import { PostLayout } from '@components'

import { fetchListingsByUser } from '@redux/actions'
import { connect } from 'react-redux'
import PostEmpty from './Empty'

class MyListings extends Component {
  constructor(props) {
    super(props)
    this.page = 1
  }

  componentDidMount() {
    const { data } = this.props.user
    this.props.fetchListingsByUser(data.id ? data.id : data.userId, this.page)
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index)
  }

  renderItem = ({ item, index }) => {
    return (
      <PostLayout
        post={item}
        key={`post-${index}`}
        layout={Constants.Layout.list}
        onViewPost={() => this.onViewPost(item, index)}
      />
    )
  }

  render() {
    const { user, onBack } = this.props
    if (typeof user.listings == 'undefined' || user.listings.length == 0) {
      return <PostEmpty onBack={onBack} />
    }
    return (
      <FlatList
        style={styles.flatlist}
        horizontal={false}
        data={user.listings}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(
  mapStateToProps,
  { fetchListingsByUser }
)(MyListings)
