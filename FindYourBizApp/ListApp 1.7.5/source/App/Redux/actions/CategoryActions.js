/** @format */

import wp from '@services/WPAPI'
import fetch from './fetch'
import { Config } from '@common'

import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_ON_SELECT,
  CATEGORY_SELECT_LAYOUT,
  CATEGORY_FETCH_MORE_SUCCESS,
} from '@redux/types'

export const fetchCategories = (page = 1) => {
  let api = wp
    .getJobListingCategory()
    .hide_empty(true)
    .page(page)
    .embed()
  if (Config.Categories.showAll) {
    api
      .page(page)
      .per_page(100)
      .embed()
  } else if (!Config.Categories.showSub) {
    api.parent(0)
  }

  return (dispatch) => {
    if (page == 1) {
      fetch(dispatch, api, CATEGORY_FETCH_SUCCESS)
    } else {
      fetch(dispatch, api, CATEGORY_FETCH_MORE_SUCCESS)
    }
  }
}

export const setActiveCategory = (id) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_ON_SELECT, payload: id })
  }
}

export const setActiveLayout = (type) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SELECT_LAYOUT, payload: type })
  }
}
