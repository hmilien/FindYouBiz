import { UPDATE_SKIP } from '@redux/types'

export const updateSkip = status => {
  return dispatch => dispatch({ type: UPDATE_SKIP, payload: status })
}
