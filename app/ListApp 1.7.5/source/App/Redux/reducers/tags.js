import { TAG_FETCH_SUCCESS, TAG_ON_SELECT } from '@redux/types'

const initialState = {
  isFetching: false,
  error: null,
  list: [],
  selectedTag: null,
}

export default (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case TAG_FETCH_SUCCESS:
      if (
        typeof payload == 'undefined' ||
        payload == null ||
        payload.length == 0
      ) {
        return state
      }

      return {
        ...state,
        error: null,
        isFetching: false,
        list: payload,
      }
    case TAG_ON_SELECT:
      return {
        ...state,
        selectedTag: payload || null,
      }
    default:
      return state
  }
}
