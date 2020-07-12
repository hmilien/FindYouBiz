/** @format */

import { ADD_TOAST, REMOVE_TOAST } from '@redux/types'

export const addToast = (msg) => {
  return { type: ADD_TOAST, payload: msg }
}

export const removeToast = () => {
  return { type: REMOVE_TOAST }
}
