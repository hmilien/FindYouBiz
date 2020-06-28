/** @format */

import { WooWorker } from '@services'
import { warn } from '@common'
import {
  FETCH_MY_ORDER,
  FETCH_ORDER_PENDING,
  FETCH_ORDER_ERROR,
} from '@redux/types'

export const actions = {
  fetchMyOrder: async (dispatch, user) => {
    dispatch({ type: FETCH_ORDER_PENDING })
    let id = typeof user.id != 'undefined' ? user.id : user.userId
    const json = await WooWorker.ordersByCustomerId(id, 40, 1)
    if (json == 'undefinded' || json.code) {
      dispatch({ type: FECH_ORDER_ERROR, error: json.message })
    } else {
      dispatch({ type: FETCH_MY_ORDER, payload: json })
    }
  },
}
