/** @format */

import {
  FETCH_POST_BOOKMARK_SUCCESS,
  ADD_POST_BOOKMARK_SUCCESS,
  REMOVE_POST_BOOKMARK_SUCCESS,
  CLEAR_BOOKMARKS,
} from '@redux/types'

const initialState = {
  isFetching: true,
  error: null,
  posts: [],
}

export default (state = initialState, action) => {
  // console.log("type:", action.type, "action:", action);
  switch (action.type) {
    case ADD_POST_BOOKMARK_SUCCESS:
    case REMOVE_POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      }
    case FETCH_POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
        error: null,
      }
    case CLEAR_BOOKMARKS:
      return { ...state, posts: [] }
    default:
      return state
  }
}
