/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Share,
} from 'react-native'
import { Images, Languages, Tools } from '@common'
import styles from './style'

class DetailShare extends PureComponent {
  state = {
    isVisible: false,
  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  show = () => {
    //this.refs.input.focus()
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
          <View style={styles.backgroundColor}>
            <View style={styles.content}>
              <View style={styles.wrapper}>
                <Text style={styles.title}>{Languages.shareTheArtical}</Text>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.shareText}>
                    <Image
                      source={Images.NativeShareIcon}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.shareTwitter}>
                    <Image source={Images.TwitterIcon} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.shareFacebook}>
                    <Image source={Images.FacebookIcon} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnCancel}
                activeOpacity={0.85}
                onPress={this.hide}>
                <Text style={styles.text}>{Languages.cancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  shareText = () => {
    this.hide()
    let { post } = this.props
    const url = post.link
    const title =
      typeof post.title.rendered != 'undefined'
        ? Tools.formatText(post.title.rendered, 300)
        : ''

    Share.share(
      {
        message: title,
        url: url,
        title: title,
      },
      {
        dialogTitle: title,
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
        tintColor: 'blue',
      }
    ).catch((error) => {})
  }

  shareTwitter = () => {
    this.hide()
    let { post } = this.props
    let url = 'https://twitter.com/intent/tweet?text=' + post.link
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
        }
      })
      .catch((err) => console.error('An error occurred', err))
  }

  shareFacebook = () => {
    this.hide()
    let { post } = this.props
    let url = 'https://www.facebook.com/sharer/sharer.php?u=' + post.link
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          //console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url)
        }
      })
      .catch((err) => console.error('An error occurred', err))
  }
}

export default DetailShare
