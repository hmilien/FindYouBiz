/** @format */

import React, { PureComponent } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import styles from './style'
import TextInputComment from '../TextInputComment'

class InputComment extends PureComponent {
  state = {
    isVisible: false,
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = (access_token) => {
    this.setState({ access_token })
    this.setState({ isVisible: true })
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible}
        onRequestClose={this.hide}>
        <TouchableWithoutFeedback onPress={this.hide}>
          <View
            style={styles.backgroundColor}
            keyboardShouldPersistTaps={'handled'}>
            <TextInputComment
              access_token={this.state.access_token}
              post={this.props.post}
              onHide={this.hide}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

export default InputComment
