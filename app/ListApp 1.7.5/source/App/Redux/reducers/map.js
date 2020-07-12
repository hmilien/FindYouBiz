/** @format */

import { Config } from '@common'
import { Dimensions } from 'react-native'

import {
  SET_REGION_MAP,
  SET_MY_POSITION,
  POST_FETCH_MAP_MARKERS_SUCCESS,
  SEARCH_MAP_MARKER_PENDING,
  SEARCH_MAP_MARKER_SUCCESS,
  SEARCH_MAP_MARKER_STOPPED,
  SEARCH_POSTS_MAP_SUCCESS,
  POST_FETCH_NEAREST_LOCATIONS_SUCCESS,
} from '@redux/types'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE = 0
const LONGITUDE = 0
const LATITUDE_DELTA = Config.map.LATITUDE_DELTA //0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const initialState = {
  region: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  },
  latitudeDelta: LATITUDE_DELTA - 0.02,
  longitudeDelta: LONGITUDE_DELTA - 0.02,
  markers: [],
  index: 0,
  searchMarkers: [],
  myPosition: '',
  isFetching: false,
  isSearching: false,
}

export default (state = initialState, action) => {
  const { type, region, marker } = action
  switch (type) {
    case SET_REGION_MAP: {
      return {
        ...state,
        region: {
          ...state.region,
          latitude: parseFloat(region.address_lat) || 0,
          longitude: parseFloat(region.address_long) || 0,
        },
        index: action.index,
      }
    }

    case POST_FETCH_MAP_MARKERS_SUCCESS:
    case POST_FETCH_NEAREST_LOCATIONS_SUCCESS: {
      const data =
        action.payload &&
        action.payload.filter((o) => {
          return o.address_lat
        })
      return {
        ...state,
        markers: data,
      }
    }

    case SET_MY_POSITION: {
      return {
        ...state,
        myPosition: action.position,
      }
    }

    case SEARCH_MAP_MARKER_PENDING: {
      return {
        ...state,
        isFetching: true,
        isSearching: true,
      }
    }

    case SEARCH_MAP_MARKER_SUCCESS:
    case SEARCH_POSTS_MAP_SUCCESS: {
      const data =
        action.payload &&
        action.payload.filter((o) => {
          return o.address_lat
        })
      return {
        ...state,
        isFetching: false,
        searchMarkers: data,
      }
    }

    case SEARCH_MAP_MARKER_STOPPED: {
      return {
        ...state,
        isSearching: false,
      }
    }

    default: {
      return state
    }
  }
}
