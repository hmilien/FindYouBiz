/** @format */

import { FETCH_CONFIG_SUCCESS } from '@redux/types'

const initialState = {
  homeLayout: 1,
  verticalLayout: 1,
  horizontalLayout: [],
  menu: [],
  color: [],
  general: [],
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_CONFIG_SUCCESS:
      // console.warn({ ...state, ...payload })
      return {
        ...state,
        ...payload,
      }
      break
    default:
      return state
  }
}
