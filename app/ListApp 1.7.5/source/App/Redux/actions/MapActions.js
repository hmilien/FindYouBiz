/** @format */

import { warn } from '@common'
import wp from '@services/WPAPI'
import fetch from './fetch'
import {
  SET_REGION_MAP,
  SET_MY_POSITION,
  POST_FETCH_MAP_MARKERS_SUCCESS,
  SEARCH_MAP_MARKER_SUCCESS,
  SEARCH_MAP_MARKER_PENDING,
  SEARCH_MAP_MARKER_STOPPED,
  POST_FETCH_NEAREST_LOCATIONS_SUCCESS,
} from '@redux/types'

export const setRegionMap = (region, index = 0 ) => {
  return (dispatch) => {
    dispatch({ type: SET_REGION_MAP, region, index })
  }
}

export const setMyAddress = (position) => {
  return (dispatch) => {
    dispatch({ type: SET_MY_POSITION, position })
  }
}

export const fetchPostMarkers = (page) => {
  const api = wp
    .getJobListing()
    .page(page)
    .embed()
  return (dispatch) => fetch(dispatch, api, POST_FETCH_MAP_MARKERS_SUCCESS)
}

export const fetchNearestLocations = (isGetLocate, lat, long) => {
  const api = wp.getFilterNearest()
              .isGetLocate(isGetLocate)
              .lat(lat).long(long)
              .embed()
  return (dispatch) => fetch(dispatch, api, POST_FETCH_NEAREST_LOCATIONS_SUCCESS);
}

export const searchPostMarker = (searchText, limit) => {
  const api = wp
    .getJobListing()
    .search(searchText)
    .embed()
    .limit(limit)

  return (dispatch) => {
    dispatch({ type: SEARCH_MAP_MARKER_PENDING })
    return fetch(dispatch, api, SEARCH_MAP_MARKER_SUCCESS)
  }
}

export const stopSearch = () => {
  return (dispatch) => {
    dispatch({ type: SEARCH_MAP_MARKER_STOPPED })
  }
}
