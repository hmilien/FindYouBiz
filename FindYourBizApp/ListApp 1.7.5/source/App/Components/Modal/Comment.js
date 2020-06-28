/** @format */

import React, { Component } from 'react'

import { Events, Images } from '@common'
import { ModalBox, Comment } from '@components'
import { LogIn } from '@container'

import styles from './styles'
import { connect } from 'react-redux'

class CommentModal extends Component {
  state = { isLoading: false, post: '' }
  componentDidMount() {
    this.sub = Events.onOpenCommentModal(this.open)
    Events.onCloseCommentModal(this.close)
  }
  componentWillUnmount() {
    this.sub && this.sub.remove()
  }

  open = ({ post }) => {
    this.setState({ post })
    this.modal.openModal()
  }

  close = () => this.modal.closeModalLayout()

  render() {
    const { userData } = this.props

    return (
      <ModalBox
        css={styles.boxComment}
        isComment
        ref={(modal) => (this.modal = modal)}>
        {userData == null ? <LogIn /> : <Comment post={this.state.post} />}
      </ModalBox>
    )
  }
}
const mapStateToProps = ({ user }) => {
  return {
    userData: user.data,
  }
}

export default connect(mapStateToProps)(CommentModal)
