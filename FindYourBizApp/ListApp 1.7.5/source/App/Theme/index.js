/** @format */

import { Theme } from '@common/AppConfig.json'
import { Constants } from '@common'
const { listable, listify, myHome, jobify } = Constants.Themes

import * as listifyTheme from './listify'
import * as listableTheme from './listable'
import * as myListingTheme from './myListing'
import * as jobifyTheme from './jobify'

let setTheme = Theme
switch (Theme) {
  case listable: {
    setTheme = listableTheme
    break
  }
  case listify: {
    setTheme = listifyTheme
    break
  }
  case myHome: {
    setTheme = myListingTheme
    break
  }
  case jobify: {
    setTheme = jobifyTheme
    break
  }
  default: {
    // set default to mylisting

    setTheme = myListingTheme
    break
  }
}

export default setTheme
