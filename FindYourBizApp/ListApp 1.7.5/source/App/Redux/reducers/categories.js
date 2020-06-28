/** @format */

import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_ON_SELECT,
  CATEGORY_SELECT_LAYOUT,
  CATEGORY_FETCH_MORE_SUCCESS,
} from '@redux/types'

import { Config } from '@common'
import { flatten } from 'lodash'

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  selectedCategory: null,
  selectedLayout: Config.CategoryListView,
}

export default (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case CATEGORY_FETCH_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }
      return {
        ...state,
        error: null,
        isFetching: false,
        list: payload || [],
      }
    case CATEGORY_ON_SELECT:
      return {
        ...state,
        isFetching: false,
        selectedCategory: payload || null,
      }
    case CATEGORY_SELECT_LAYOUT:
      return {
        ...state,
        isFetching: false,
        selectedLayout: payload || false,
      }
    case CATEGORY_FETCH_MORE_SUCCESS: {
      return {
        ...state,
        error: null,
        isFetching: false,
        list: state.list.concat(flatten(payload)),
      }
    }

    default:
      return state
  }
}
