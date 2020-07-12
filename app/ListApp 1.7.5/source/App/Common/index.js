/** @format */
import { withNavigation as _withNavigation } from 'react-navigation'
import _Color from './Color'
import _Constants from './Constants'
import _Images from './Images'
import _Languages from './Languages'
import _Layout from './Layout'
import _Style from './style'
import _Tools from './Tools'
import _Events from './Events'
import _Config from './Config'
import _Icons from './Icons'
import _Device from './Device'
import _BlockTimer from './BlockTimer'
import _IntroData from './IntroData'
import reactotron from 'reactotron-react-native'
import _Validator from './Validator'
import _Validate from './Validate'
import _AppConfig from './AppConfig.json'

const log = (values) => __DEV__ && reactotron.log(values)
const warn = (values) => __DEV__ && reactotron.warn(values)
const error = (values) => __DEV__ && reactotron.error(values)
export function connectConsoleToReactotron() {
  console.log = log
  console.warn = warn
  console.error = error
}

export const request = async (url, data = {}) => {
  try {
    const response = await fetch(url, data)

    return await response.json()
  } catch (err) {
    error(err)
    return { error: err }
  }
}

export const Color = _Color
export const Constants = _Constants
export const Images = _Images
export const Languages = _Languages
export const Layout = _Layout
export const Style = _Style
export const Tools = _Tools
export const Events = _Events
export const Config = _Config
export const Icons = _Icons
export const Device = _Device
export const BlockTimer = _BlockTimer
export const IntroData = _IntroData
export const Reactotron = reactotron
export const Validator = _Validator
export const Validate = _Validate
export const AppConfig = _AppConfig
export const HorizonLayouts = Config.Local
export const withNavigation = _withNavigation
