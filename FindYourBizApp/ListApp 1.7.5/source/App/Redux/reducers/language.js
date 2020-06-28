/** @format */

import { Config } from '@common'
import { SWITCH_LANGUAGE } from '@redux/types'

const initialState = {
  lang: Config.Language,
}

export default (state = initialState, action) => {
  const { lang } = action
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return {
        ...state,
        lang,
      }

    default:
      return state
  }
}
