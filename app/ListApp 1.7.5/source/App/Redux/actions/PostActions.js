/** @format */

import { WPAPI } from '@services'
import { Constants, Config, Languages, AppConfig } from '@common'
import User from '@services/User'
import ApiClient from '@services/apiClient'
import { Api } from '@services'
import fetch from './fetch'
const { Theme } = AppConfig
const ApiFromClient = new ApiClient({
  baseUrl: AppConfig.Website.url,
})
const publish = Config.PostStatus

import {
  FETCH_PENDING,
  PHOTO_FETCH_SUCCESS,
  POST_RELATED_FETCH_SUCCESS,
  POST_CHANGE_LAYOUT_SUCCESS,
  PHOTO_FETCH_MORE,
  FETCH_POST_BOOKMARK_SUCCESS,
  FETCH_PENDING_SEARCH,
  CLEAR_BOOKMARKS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_MAP_SUCCESS,
  SEARCH_POSTS_STOPPED,
  SEARCH_MAP_MARKER_PENDING,
  CLEAR_SEARCH_POSTS,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  ADD_POST_BOOKMARK_SUCCESS,
  REMOVE_POST_BOOKMARK_SUCCESS,
  POST_BY_CATES_FETCH_SUCCESS,
  POST_BY_CATES_FETCH_MORE,
  POST_FETCH_RECENTS_SUCCESS,
  POST_FETCH_RECENTS_MORE,
  POST_TAG_FETCH_SUCCESS,
  POST_TAG_FETCH_MORE,
} from '@redux/types'
// import console = require('console');

export const fetchPosts = (
  page = 1,
  component = Constants.Components.listing,
  categories = null, // use for job_listing & news
  types = null,
  tags = null,
  regions = null,
  index = -1
) => {
  const limit = Constants.PagingLimit

  // Constants.Debug && console.log('start fetching post...');
  let api = null

  if (component == Constants.Components.news) {
    api = WPAPI.posts()
    // .per_page(limit)
    // .page(page)
    // .status(publish)
    // .embed()
    if (categories != null && typeof categories !== 'undefined') {
      api.categories(categories)
    }
  } else {
    api = WPAPI.getJobListing()
      .per_page(limit)
      .page(page)
      .embed()
    if (categories != null && typeof categories !== 'undefined') {
      if (Theme == 'myListing') {
        api['job_listing_category'](categories)
      } else {
        api.job_listing_category(categories)
      }
    }
    if (types && typeof types !== 'undefined') {
      api.job_listing_type(types)
    }
    if (tags != null) {
      api.tag(tags)
    }
    if (regions) {
      api.region(regions).job_listing_region(regions)
    }
  }

  return (dispatch) => {
    dispatch({ type: FETCH_PENDING })
    if (page === 1) {
      return fetch(dispatch, api, POST_TAG_FETCH_SUCCESS, { component, index })
    }
    return fetch(dispatch, api, POST_TAG_FETCH_MORE, { component, index })
  }
}

export const fetchPostRecent = (page = 1) => {
  const limit = Constants.PagingLimit
  const component = Constants.Components.listing
  // Constants.Debug && console.log('start fetching post...');
  let api = WPAPI.getJobListing()
    .per_page(limit)
    .page(page)
    .embed()

  return (dispatch) => {
    dispatch({ type: FETCH_PENDING })
    if (page === 1) {
      return fetch(dispatch, api, POST_FETCH_RECENTS_SUCCESS, { component })
    }
    return fetch(dispatch, api, POST_FETCH_RECENTS_MORE, { component })
  }
}

export const fetchPostsByTerm = (page = 1, taxonomies = null) => {
  const limit = Constants.PagingLimit

  const api = WPAPI.getJobListing()
    .per_page(limit)
    .page(page)
    .embed()
  if (Theme == 'myListing') {
    api['job_listing_category'](taxonomies)
  } else {
    api.job_listing_category(taxonomies)
  }

  return (dispatch) => {
    dispatch({ type: FETCH_PENDING })
    if (page == 1) {
      return fetch(dispatch, api, POST_BY_CATES_FETCH_SUCCESS)
    }
    return fetch(dispatch, api, POST_BY_CATES_FETCH_MORE)
  }
}

export const fetchPhotos = (page) => {
  const limit = Constants.PagingLimit
  const { mime_type, media_type } = Constants.Photo
  const api = WPAPI.getPhotos()
    .media_type(media_type)
    .mime_type(mime_type)
    .per_page(limit)
    .page(page)
    .embed()

  return (dispatch) => {
    dispatch({ type: FETCH_PENDING })
    if (page == 1) {
      return fetch(dispatch, api, PHOTO_FETCH_SUCCESS)
    }
    return fetch(dispatch, api, PHOTO_FETCH_MORE)
  }
}

export const fetchPostsRelated = (
  page,
  categoryId,
  postCurrent,
  component = Constants.Components.listing
) => {
  const limit = Constants.PagingLimit
  let api = null
  if (component == Constants.Components.news) {
    api = WPAPI.posts()
      .categories(categoryId)
      .per_page(limit)
      .page(page)
      .embed()
  } else {
    api = WPAPI.getJobListing()
      .job_listing_category(categoryId)
      .exclude(postCurrent.id)
      .page(page)
      .embed()
  }

  return (dispatch) =>
    fetch(dispatch, api, POST_RELATED_FETCH_SUCCESS, { component })
}

export const fetchPostsBookmark = () => {
  return (dispatch) => {
    User.getPosts().then((data) =>
      dispatch({ type: FETCH_POST_BOOKMARK_SUCCESS, payload: data })
    )
  }
}

export const addBookMark = (post) => {
  return async (dispatch) => {
    await User.savePost(post)
    return User.getPosts().then((data) =>
      dispatch({ type: ADD_POST_BOOKMARK_SUCCESS, payload: data })
    )
  }
}

export const removeBookMark = (post) => {
  return async (dispatch) => {
    await User.removePost(post)
    return User.getPosts().then((data) =>
      dispatch({ type: REMOVE_POST_BOOKMARK_SUCCESS, payload: data })
    )
  }
}

export const clearPosts = () => {
  return async (dispatch) => {
    await User.clearPosts()
    dispatch({ type: CLEAR_BOOKMARKS })
  }
}

export const changeLayout = (layout = Constants.Layout.default) => {
  return (dispatch) => {
    dispatch({ type: POST_CHANGE_LAYOUT_SUCCESS, layout })
  }
}

export const searchPosts = (
  isMap = false,
  searchText = '',
  cates = null,
  tags = null,
  type = null,
  regions = null,
  typeListable = null,
  limit = Constants.PagingLimit,
  page = 1
) => {
  // warn([cates, tags, type, regions])
  let api = WPAPI.getFilter()
  if (searchText != '') {
    api.search(searchText)
  }
  if (cates != null) {
    api.categories(cates)
  }
  if (tags != null) {
    api.tags(tags)
  }
  if (type != null) {
    api.type(type)
  }
  if (regions != null) {
    api.regions(regions)
  }

  if (typeListable != null) {
    api.typeListable(typeListable)
  }

  api
    .limit(limit)
    .page(page)
    .embed()

  return (dispatch) => {
    dispatch({ type: FETCH_PENDING_SEARCH })
    if (isMap) {
      dispatch({ type: SEARCH_MAP_MARKER_PENDING })
    }
    return fetch(
      dispatch,
      api,
      !isMap ? SEARCH_POSTS_SUCCESS : SEARCH_POSTS_MAP_SUCCESS
    )
  }
}

export const stopSearchPosts = () => {
  return (dispatch) => {
    dispatch({ type: SEARCH_POSTS_STOPPED })
  }
}

export const clearSearchPosts = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_SEARCH_POSTS })
  }
}

export const createPost = (data, onProgress) => {
  return (dispatch) => {
    dispatch({ type: CREATE_POST_PENDING })

    //upload file
    let fileName = data.imageUri.split('/').pop()
    ApiFromClient.uploadFileWithProgress(
      '/wp-json/wp/v2/media',
      data.imageUri,
      fileName,
      'file',
      {},
      onProgress,
      data.token
    )
      .then(({ statusCode, body }) => {
        if (statusCode == 201) {
          //submit post
          // console.log(['data', statusCode, body])

          // if (isListable) {
          //   fields = {
          //     ...fields,
          //     content,
          //     categories: type,
          //   }
          // }
          data = Object.assign({}, data, {
            meta_input: {
              ...data.meta_input,
              _thumbnail_id: body.id,
            },
          })

          // console.warn(['data', data])

          Api.createPost(data.user, null, data)
            .then((response) => {
              if (response.status == 'ok') {
                dispatch({ type: CREATE_POST_SUCCESS })
              } else {
                if (response.message != undefined) {
                  dispatch({
                    type: CREATE_POST_FAIL,
                    message: response.message,
                  })
                } else {
                  dispatch({
                    type: CREATE_POST_FAIL,
                    message: Languages.errorMsgConnectServer,
                  })
                }
              }
            })
            .catch((error) => {
              dispatch({
                type: CREATE_POST_FAIL,
                message: Languages.errorMsgConnectServer,
              })
            })
        } else {
          if (body.message != undefined) {
            dispatch({ type: CREATE_POST_FAIL, message: body.message })
          } else {
            dispatch({
              type: CREATE_POST_FAIL,
              message: Languages.errorMsgConnectServer,
            })
          }
        }
      })
      .catch((error) => {
        if (error.response.data.message != undefined) {
          dispatch({
            type: CREATE_POST_FAIL,
            message: error.response.data.message,
          })
        } else {
          dispatch({
            type: CREATE_POST_FAIL,
            message: Languages.errorMsgConnectServer,
          })
        }
      })
  }
}
