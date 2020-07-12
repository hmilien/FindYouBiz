/** @format */

import User from '@services/User'
import wp from '@services/WPAPI'
import fetch from './fetch'
import { Constants, warn } from '@common'

import {
  FETCH_POST_BY_USER_SUCCESS,
  FETCH_POSTS_USER_MORE,
  SET_CHAT,
  CLEAR_CHAT,
  FETCH_USER_SUCCESS,
  CLEAR_USER_SUCCESS,
  FETCH_LISTING_BY_USER_SUCCESS,
  FETCH_LISTING_USER_MORE,
} from '@redux/types'

export const setChat = (chat) => {
  return (dispatch) => dispatch({ type: SET_CHAT, chat })
}

export const clearChat = () => {
  return (dispatch) => dispatch({ type: CLEAR_CHAT })
}

export const fetchUserData = () => {
  return (dispatch) =>
    User.getUser()
      .then((data) => dispatch({ type: FETCH_USER_SUCCESS, payload: data }))
      .catch((err) => console.error(err))
}

export const clearUserData = () => {
  return (dispatch) =>
    dispatch({
      type: CLEAR_USER_SUCCESS,
      posts: [],
      cookie: null,
      payload: undefined,
    })
}

export const fetchPostsByUser = (id, page) => {
  let limit = Constants.PagingLimit
  const api = wp
    .posts()
    .author(id)
    .perPage(limit)
    .page(page)
    .embed()

  return (dispatch) => {
    if (page == 1) {
      return fetch(dispatch, api, FETCH_POST_BY_USER_SUCCESS)
    }
    return fetch(dispatch, api, FETCH_POSTS_USER_MORE)
  }
}

export const fetchListingsByUser = (id, page) => {
  const api = wp
    .getFilter()
    .author(id)
    .limit(100)
    .page(page)
    .embed()

  return (dispatch) => {
    return fetch(dispatch, api, FETCH_LISTING_BY_USER_SUCCESS)
  }
}
