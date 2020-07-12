/** @format */

import React, { Component } from 'react'
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'

import { Events, Images } from '@common'
import { ModalBox } from '@components'

import styles from './styles'

export default class FilterModal extends Component {
  state = {
    bookTable: true,
    rated: false,
    opennow: false,
    bookmarked: false,
  }
  componentDidMount() {
    Events.onOpenFilterModal(this.open)
  }

  open = () => this.modal.openModal()

  close = () => this.modal.closeModalLayout()

  openMore = () => Alert.alert('Opened More Clicked !')

  render() {
    const renderMoreRestaurants = () => (
      <TouchableOpacity style={styles.wrapReserve}>
        <Text style={styles.textReserve}>{'See 272 Restaurants'}</Text>
        <Image
          source={{ uri: Images.icons.next }}
          style={[styles.imgReverse, { tintColor: '#FFF' }]}
        />
      </TouchableOpacity>
    )
    return (
      <ModalBox
        isFilter
        css={styles.boxFilter}
        ref={(modal) => (this.modal = modal)}>
        <View style={styles.boxFilter}>
          <View style={[styles.rowFilter, { marginTop: 20 }]}>
            <Text style={styles.rowTitleText}>{'Quick Filter'}</Text>
          </View>
          <View style={styles.rowFilter}>
            <View style={styles.rowFilterLeft}>
              <Text style={styles.label}>{'Book a Table'}</Text>
            </View>
            <View style={styles.rowFilterRight}>
              <Switch
                value={this.state.bookTable}
                onValueChange={(value) => this.setState({ bookTable: value })}
              />
            </View>
          </View>
          <View style={styles.rowFilter}>
            <View style={styles.rowFilterLeft}>
              <Text style={styles.label}>{'Rated 3.5'}</Text>
            </View>
            <View style={styles.rowFilterRight}>
              <Switch
                value={this.state.rated}
                onValueChange={(value) => this.setState({ rated: value })}
              />
            </View>
          </View>
          <View style={styles.rowFilter}>
            <View style={styles.rowFilterLeft}>
              <Text style={styles.label}>{'Open Now'}</Text>
            </View>
            <View style={styles.rowFilterRight}>
              <Switch
                value={this.state.opennow}
                onValueChange={(value) => this.setState({ opennow: value })}
              />
            </View>
          </View>
          <View style={styles.rowFilter}>
            <View style={styles.rowFilterLeft}>
              <Text style={styles.label}>{'Bookmarked'}</Text>
            </View>
            <View style={styles.rowFilterRight}>
              <Switch
                value={this.state.bookmarked}
                onValueChange={(value) => this.setState({ bookmarked: value })}
              />
            </View>
          </View>
        </View>
        {renderMoreRestaurants()}
      </ModalBox>
    )
  }
}
