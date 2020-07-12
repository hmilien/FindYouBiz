/** @format */

import { warn } from '@common'
import {
  FETCH_MY_ORDER,
  FETCH_ORDER_PENDING,
  FETCH_ORDER_ERROR,
} from '@redux/types'

const initialState = {
  myOrders: [],
  isFetching: false,
  error: null,
}

export default (state = initialState, action) => {
  const { type, error, payload } = action
  switch (type) {
    case FETCH_MY_ORDER: {
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return {
          ...state,
          isFetching: false,
        }
      }

      return {
        ...state,
        isFetching: false,
        myOrders: payload,
      }
    }

    case FETCH_ORDER_PENDING: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case FETCH_ORDER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error,
      }
    }
    default: {
      return state
    }
  }
}
