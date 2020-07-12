/** @format */

import { ADD_TOAST, REMOVE_TOAST } from '@redux/types'

const initialState = {
  message: '',
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_TOAST: {
      return {
        ...state,
        message: payload,
      }
    }
    case REMOVE_TOAST: {
      return {
        ...state,
        message: null
      }
    }
    default: {
      return state
    }
  }
}
