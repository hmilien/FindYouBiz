/** @format */

import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux'
import { updateConnectionStatus } from '@redux/actions'
import { Events, Languages } from '@common'

class MyNetInfo extends Component {
  constructor(props) {
    super(props)
    this.skipFirstToast = true
  }

  componentWillMount() {
    this.net = NetInfo.fetch().then(state => {
      this._handleConnectionChange(state.isConnected)
    });
  }

  componentWillUnmount() {
    this.net && this.net.remove()
  }

  _handleConnectionChange = (isConnected) => {
    this.props.updateConnectionStatus(isConnected)
    if (!isConnected) return

    if (!this.skipFirstToast) {
      Events.toast('Regain internet connection')
    } else {
      this.skipFirstToast = false
    }
  }

  render() {
    const { netInfo } = this.props

    if (netInfo.isConnected) return <View />
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>{Languages.noConnection}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0, .8)',
    alignItems: 'center',
    paddingVertical: 0,
  },
  connectionText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
})

const mapStateToProps = ({ netInfo }) => ({ netInfo })

export default connect(
  mapStateToProps,
  { updateConnectionStatus }
)(MyNetInfo)
