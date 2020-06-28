/** @format */

import {
  TAGS_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  CASE27_TYPES_FETCH_SUCCESS,
  REGIONS_FETCH_SUCCESS,
  JOB_TYPES_FETCH_SUCCESS,
  ITEMS_SELECTED_SEARCH,
  CLEAR_SEARCH_POSTS,
} from '@redux/types'

const initialState = {
  tags: [],
  categories: [],
  types: [],
  regions: [],
  jobTypes: [],
  selected: [],
  clear: false,
}

export default (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case TAGS_FETCH_SUCCESS:
      return {
        ...state,
        tags: payload,
      }
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: payload,
      }
    case CASE27_TYPES_FETCH_SUCCESS:
      return {
        ...state,
        types: payload,
      }

    case ITEMS_SELECTED_SEARCH:
      return {
        ...state,
        selected: payload,
      }
    case CLEAR_SEARCH_POSTS:
      return {
        ...state,
        selected: [],
        clear: true,
      }
    // for listify
    case REGIONS_FETCH_SUCCESS: {
      return {
        ...state,
        regions: payload,
      }
    }
    case JOB_TYPES_FETCH_SUCCESS: {
      return {
        ...state,
        jobTypes: payload,
      }
    }

    default:
      return state
  }
}
