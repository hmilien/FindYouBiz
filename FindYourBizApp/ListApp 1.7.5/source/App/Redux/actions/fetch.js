/** @format */

import { Constants } from '@common'

const { news } = Constants.Components
import {
  PHOTO_FETCH_SUCCESS,
  PHOTO_FETCH_MORE,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_MORE_SUCCESS,
  FETCH_CONFIG_SUCCESS,
  TAGS_FETCH_SUCCESS,
  CATEGORIES_FETCH_SUCCESS,
  CASE27_TYPES_FETCH_SUCCESS,
  REGIONS_FETCH_SUCCESS,
  JOB_TYPES_FETCH_SUCCESS,
} from '@redux/types'

import { News, Photo, Category } from '@data'
import Theme from '@theme'

const fetch = (dispatch, api, type, extra = {}) =>
  api.get((err, data) => {
    // check the paging is finish
    let finish = false
    if (err) {
      dispatch({ type: type, payload: data, extra, finish, err })
    }

    if (typeof data === 'undefined' || data.length === 0) {
      finish = true;
      dispatch({ type: type, payload: [], extra, finish })
    }

    switch (type) {
      case FETCH_CONFIG_SUCCESS:
      case TAGS_FETCH_SUCCESS:
      case CATEGORIES_FETCH_SUCCESS:
      case CASE27_TYPES_FETCH_SUCCESS:
      case REGIONS_FETCH_SUCCESS:
      case JOB_TYPES_FETCH_SUCCESS:
        break
      case PHOTO_FETCH_SUCCESS:
      case PHOTO_FETCH_MORE:
        data = data && data.map((photo) => new Photo(photo))
        break
      case CATEGORY_FETCH_SUCCESS:
      case CATEGORY_FETCH_MORE_SUCCESS:
        data = data && data.map((cate) => new Category(cate))
        break
      default:
        if (extra.component === news) {
          data = data && data.map((post) => new News(post))
        } else {
          data = data && data.map((post) => new Theme.Post(post))
        }
    }

    dispatch({ type, payload: data, extra, finish })
  })

export default fetch
