/** @format */

import { POST_TAG_FETCH_SUCCESS, POST_TAG_FETCH_MORE } from '@redux/types'
import { flatten } from 'lodash'
import { Config } from '@common'

const initialState = Config.Local.horizontalLayout

export default (state = initialState, action) => {
  const { extra, type, payload } = action

  switch (type) {
    case POST_TAG_FETCH_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }

      return state.map((item, index) => {
        if (typeof extra != 'undefined' && index !== extra.index) {
          return item
        }
        return {
          ...item,
          list: flatten(payload),
        }
      })

    case POST_TAG_FETCH_MORE:
      return state.map((item, index) => {
        if (typeof extra != 'undefined' && index !== extra.index) {
          return item
        }
        return {
          ...item,
          list: item.list.concat(flatten(payload)),
        }
      })

    default:
      return state
  }
}
