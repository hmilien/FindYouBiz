/** @format */

import {
  STICKY_FETCH_SUCCESS,
  POST_BY_CATES_FETCH_SUCCESS,
  POST_BY_CATES_FETCH_MORE,
  FETCH_PENDING,
  PHOTO_FETCH_SUCCESS,
  POST_RELATED_FETCH_SUCCESS,
  POST_CHANGE_LAYOUT_SUCCESS,
  PHOTO_FETCH_MORE,
  FETCH_PENDING_SEARCH,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_STOPPED,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  POST_FETCH_RECENTS_SUCCESS,
  POST_FETCH_RECENTS_MORE,
} from '@redux/types'

import { flatten } from 'lodash'

const initialState = {
  isFetching: false,
  postFinish: false,
  error: null,
  list: [],
  sticky: [],

  // need refactor
  photos: [],
  related: [],
  postsInSearch: [],
  isFetchingSearch: false,
  isSearched: false,
  //
  listByCates: [],
}

export default (state = initialState, action) => {
  const { type, payload, finish, err } = action

  switch (type) {
    case FETCH_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case POST_FETCH_RECENTS_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }

      return {
        ...state,
        error: err || null,
        postFinish: action.finish,
        isFetching: false,
        list: flatten(payload),
      }

    case POST_FETCH_RECENTS_MORE:
      return {
        ...state,
        error: err || null,
        postFinish: finish,
        isFetching: false,
        list: state.list.concat(flatten(payload)),
      }
    case POST_BY_CATES_FETCH_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }

      return {
        ...state,
        error: err || null,
        postFinish: action.finish,
        isFetching: false,
        listByCates: flatten(payload),
      }

    case POST_BY_CATES_FETCH_MORE:
      return {
        ...state,
        error: err || null,
        postFinish: finish,
        isFetching: false,
        listByCates: state.listByCates.concat(flatten(payload)),
      }

    case PHOTO_FETCH_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }

      return {
        ...state,
        error: null || err,
        postFinish: finish,
        isFetching: false,
        photos: flatten(payload),
      }

    case PHOTO_FETCH_MORE:
      return {
        ...state,
        error: err,
        postFinish: finish,
        isFetching: false,
        photos: state.photos.concat(flatten(payload)),
      }
    case POST_CHANGE_LAYOUT_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        layout: action.layout,
      }

    case STICKY_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        sticky: payload,
      }

    case POST_RELATED_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        related: payload,
      }
    case FETCH_PENDING_SEARCH:
      return {
        ...state,
        isFetchingSearch: true,
      }
    case SEARCH_POSTS_SUCCESS: {
      return {
        ...state,
        error: null,
        isFetchingSearch: false,
        isSearched: true,
        postsInSearch: payload,
      }
    }

    case SEARCH_POSTS_STOPPED: {
      return {
        ...state,
        isFetchingSearch: false,
        isSearched: false,
      }
    }

    case CREATE_POST_PENDING:
      return {
        ...state,
        type: action.type,
      }

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        type: action.type,
      }

    case CREATE_POST_FAIL:
      return {
        ...state,
        type: action.type,
        message: action.message,
      }

    default:
      return state
  }
}
