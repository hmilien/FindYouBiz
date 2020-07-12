import { UPDATE_SKIP } from '@redux/types'

const initialState = {
  status: false,
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_SKIP: {
      return {
        ...state,
        status: payload,
      }
    }

    default: {
      return state
    }
  }
}
