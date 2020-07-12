/** @format */

'use strict'

import React, { Component } from 'react'
import { Animated } from 'react-native'
import { connect } from 'react-redux'
import { LogoSpinner, AgendaCalendar } from '@components'
import OrderEmpty from './Empty'

class MyBookings extends Component {
  state = { scrollY: new Animated.Value(0) }
  componentDidMount() {
    this.fetchBookingData()
  }

  fetchBookingData = () => {
    const { data } = this.props.user
    if (typeof data === 'undefined' || data === null) return
    this.props.fetchMyOrder(data)
  }

  render() {
    const { navigation, orders } = this.props
    const data = orders.myOrders

    if (orders.isFetching) {
      return <LogoSpinner fullStretch={true} />
    }

    if (typeof data == 'undefined' || data.length == 0) {
      return <OrderEmpty onBack={() => navigation.goBack()} />
    }

    return <AgendaCalendar navigation={navigation} items={data} />
  }
}
const mapStateToProps = ({ user, orders }) => ({ user, orders })

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps
  const { actions } = require('@redux/actions/OrderActions')
  return {
    ...ownProps,
    ...stateProps,
    fetchMyOrder: (user) => {
      actions.fetchMyOrder(dispatch, user)
    },
  }
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(MyBookings)
