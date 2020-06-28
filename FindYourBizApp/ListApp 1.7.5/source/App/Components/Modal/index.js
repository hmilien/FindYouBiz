/** @format */

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Events } from '@common'
import { CloseButton } from '@components'
import Modal from 'react-native-modalbox'
import styles from './styles'

export default class Index extends Component {
  closeModal = () => {
    this.modal.close()
    Events.reopenBtnFilter()
  }

  closeModalLayout() {
    this.modal.close()
  }

  openModal() {
    this.modal.open()
  }

  render() {
    const {
      type,
      isFilter,
      noSwipe,
      isBooking,
      isComment,
      isFilterAdvance,
      isPhoto,
      isChat,
      css,
      cssBlur,
    } = this.props

    return (
      <Modal
        ref={(modal) => (this.modal = modal)}
        animationDuration={100}
        swipeToClose={typeof noSwipe != 'undefined' ? false : true}
        backdropOpacity={Platform.OS == 'android' ? 1 : 0.5}
        position={'top'}
        style={[
          typeof type != 'undefined'
            ? styles.modalDefault
            : styles.modalBoxWrap,
          css,
          isBooking && styles.isBooking,
        ]}>
        {this.props.children}

        {(!isPhoto || isChat) && (
          <CloseButton onPress={this.closeModal} {...this.props} />
        )}
      </Modal>
    )
  }
}
