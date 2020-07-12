/** @format */

import {
  COUNTRY_FETCHING,
  COUNTRY_FETCH_SUCCESS,
  COUNTRY_FETCH_FAILURE,
} from '@redux/types'

const initialState = {
  list: {},
  isFetching: false,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case COUNTRY_FETCH_SUCCESS:
      return {
        ...state,
        list: payload,
        isFetching: false,
      }

    case COUNTRY_FETCH_FAILURE:
      return {
        ...state,
        finish: true,
        isFetching: false,
      }

    case COUNTRY_FETCHING:
      return {
        ...state,
        isFetching: true,
      }

    default:
      return state
  }
}
