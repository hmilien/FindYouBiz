/** @format */

import { WPAPI } from '@services'
import fetch from './fetch'
import { Config, HorizonLayouts } from '@common'
import { FETCH_CONFIG_SUCCESS } from '@redux/types'

export const fetchConfig = () => {
  if (Config.Local.enable) {
    return (dispatch) =>
      dispatch({ type: FETCH_CONFIG_SUCCESS, payload: HorizonLayouts })
  }

  let api = WPAPI.getConfig()
  return (dispatch) => fetch(dispatch, api, FETCH_CONFIG_SUCCESS)
}
