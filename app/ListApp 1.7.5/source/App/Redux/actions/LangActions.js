/** @format */

import { Languages } from '@common'

import { SWITCH_LANGUAGE } from '@redux/types'

export const switchLanguage = (lang) => {
  Languages.setLocale(lang)
  return (dispatch) => dispatch({ type: SWITCH_LANGUAGE, lang })
}
