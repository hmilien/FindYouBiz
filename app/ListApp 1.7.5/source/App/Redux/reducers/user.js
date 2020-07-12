/** @format */

import {
  FETCH_POST_BY_USER_SUCCESS,
  FETCH_POSTS_USER_MORE,
  FETCH_USER_SUCCESS,
  CLEAR_USER_SUCCESS,
  SET_CHAT,
  CLEAR_CHAT,
  FETCH_LISTING_BY_USER_SUCCESS,
  FETCH_LISTING_USER_MORE,
} from '@redux/types'

const initialState = {
  posts: [],
  data: null,
  token: null,
  cookie: null,
  error: null,
  chat: {},
  listings: [],
  isLoginFB: false,
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_USER_MORE:
      return {
        ...state,
        error: null,
        isFetching: false,
        posts: state.posts.concat(action.payload),
      }
    case FETCH_POST_BY_USER_SUCCESS:
      return { ...state, posts: action.payload }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        token: action.payload.jwtToken ? action.payload.jwtToken : null,
        isLoginFB: action.payload.isLoginFB ? action.payload.isLoginFB : false,
        cookie: action.payload.cookie ? action.payload.cookie : null,
      }
    case CLEAR_USER_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        token: null,
        data: action.payload,
        cookie: null,
      }
    case SET_CHAT: {
      return { ...state, chat: action.chat }
    }
    case CLEAR_CHAT: {
      return { ...state, chat: {} }
    }
    case FETCH_LISTING_BY_USER_SUCCESS:
      return { ...state, listings: action.payload }
    case FETCH_LISTING_USER_MORE:
      return {
        ...state,
        error: action.err,
        isFetching: false,
        listings: state.listings.concat(action.payload),
      }
    default:
      return state
  }
}
