/** @format */

import { WPAPI } from '@services'
import fetch from './fetch'

import {
  TAGS_FETCH_SUCCESS,
  CASE27_TYPES_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  REGIONS_FETCH_SUCCESS,
  JOB_TYPES_FETCH_SUCCESS,
  ITEMS_SELECTED_SEARCH,
} from '@redux/types'

export const fetchListingTags = () => {
  const api = WPAPI.getCase27ListingTags().embed()
  return (dispatch) => fetch(dispatch, api, TAGS_FETCH_SUCCESS)
}

export const fetchListingCategories = (hide_empty = true, per_page = 20) => {
  const api = WPAPI.getAllCategories()
    .hide_empty(hide_empty)
    .per_page(per_page)
    .embed()
  return (dispatch) => fetch(dispatch, api, CATEGORIES_FETCH_SUCCESS)
}

export const fetchListingTypes = () => {
  const api = WPAPI.getCase27ListingTypes().embed()
  return (dispatch) => fetch(dispatch, api, CASE27_TYPES_FETCH_SUCCESS)
}

export const fetchListingRegions = () => {
  const api = WPAPI.getAllRegions().embed()
  return (dispatch) => fetch(dispatch, api, REGIONS_FETCH_SUCCESS)
}

export const fetchSingleRegion = () => {
  const api = WPAPI.getSingleRegion().embed()
  return (dispatch) => fetch(dispatch, api, REGIONS_FETCH_SUCCESS)
}

// for listable, jobify
export const fetchTypes = () => {
  const api = WPAPI.getTypes().embed()
  return (dispatch) => fetch(dispatch, api, JOB_TYPES_FETCH_SUCCESS)
}

export const selectedSearch = (items) => {
  return (dispatch) => dispatch({ type: ITEMS_SELECTED_SEARCH, payload: items })
}
