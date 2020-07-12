/**
 * Created by InspireUI on 28/02/2017.
 *
 * @format
 */

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Events, BlockTimer } from '@common'
import Toast from 'react-native-root-toast'

class ToastComp extends PureComponent {
  state = { visible: false }
  componentDidMount() {
    this.toastListener = Events.onToast(this.doToast.bind(this))
  }

  componentWillUnmount() {
    this.toastListener.remove()
  }

  render() {
    const { message } = this.props
    if (message != '' && typeof  message != 'undefined') {
      return (
        <Toast
          visible={this.state.visible}
          position={50}
          shadow={true}
          animation={true}
          hideOnPress={true}>
          <Text>{message.replace(/<[^>]+>/g, '') }</Text>
        </Toast>
      )
    }
    return <View />
  }

  _onPress = () => this.props.removeToast()

  doToast(msg) {
    const { addToast } = this.props
    if (msg != '') {
      this.setState({ visible: true })
      addToast(msg)
      BlockTimer.timer().setTimeout(
        () => this.setState({ visible: false }),
        3000
      )
    }
  }
}

ToastComp.propTypes = {
  addToast: PropTypes.func.isRequired,
  removeToast: PropTypes.func.isRequired,
}

const mapStateToProps = ({ toast }) => {
  return {
    message: toast.message != '' ? toast.message : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  const { addToast, removeToast } = require('@redux/actions')
  return {
    addToast: (msg) => dispatch(addToast(msg)),
    removeToast: () => dispatch(removeToast()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastComp)
