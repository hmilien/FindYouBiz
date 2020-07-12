import React, { Component } from 'react'
import { IconImage, ModalBox } from '@components'
import { LogIn } from '@container'
import { Events } from '@common'
import { Chat } from '@container'
import styles from './styles'

export default class ChatModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
    }
  }

  componentDidMount() {
    this.modalChatClick = Events.onOpenChatModal(this.open.bind(this))
    this.modalChatClose = Events.onCloseChatModal(this.close.bind(this))
  }

  componentWillUnMount() {
    this.modalChatClick.remove()
  }

  open(author) {
    this.setState({ author })
    if (typeof this.refs.modal != 'undefined') {
      this.refs.modal.openModal()
    }
  }

  close() {
    if (typeof this.refs.modal != 'undefined') {
      this.refs.modal.closeModal()
    }
  }

  render() {
    return (
      <ModalBox css={[styles.boxFilter]} ref="modal">
        <Chat author={this.state.author} />
      </ModalBox>
    )
  }
}
