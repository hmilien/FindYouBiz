import { warn } from '@common'
import { UPDATE_CONNECTION_STATUS } from '@redux/types'

export const updateConnectionStatus = isConnected => {
  return dispatch => {
    dispatch({ type: UPDATE_CONNECTION_STATUS, isConnected })
  }
}
