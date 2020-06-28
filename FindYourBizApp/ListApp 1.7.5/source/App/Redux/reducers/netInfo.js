import { UPDATE_CONNECTION_STATUS } from '@redux/types'

const initialState = {
  isConnected: true,
}

export default (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected,
      }
    default:
      return state
  }
}
