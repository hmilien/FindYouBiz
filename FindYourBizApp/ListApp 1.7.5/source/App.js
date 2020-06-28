/** @format */

import React from 'react'
import { Image, YellowBox } from 'react-native'
import { AppLoading, Notifications, Asset } from '@expo'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { WooWorker } from 'api-ecommerce'

import { log, Tools, Config, AppConfig } from '@common'
import Sentry from 'sentry-expo'
import OneSignal from 'react-native-onesignal'

import { Analytics, PageHit } from 'expo-analytics'
import RootRouter from './App/RootRouter'

import store from '@store/configureStore'
import './ReactotronConfig'

import registerForPushNotification from './App/registerForPushNotification'
import { SafeAreaView } from 'react-navigation'

console.ignoredYellowBox = [
  'Warning: View.propTypes',
  'Warning: BackAndroid',
  'Require cycle:',
  'Require cycle',
]
// fix warning Require cycle expo 31
YellowBox.ignoreWarnings(['Require cycle'])
YellowBox.ignoreWarnings(['Require cycle:'])

if (Config.crashReport.enable) {
  Sentry.config(Config.crashReport.sentryCode).install()
}
persistStore(store)
const fontData = {
  OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
  Volkhov: require('./assets/fonts/Volkhov-Regular.ttf'),
  Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
  MontserratBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { appIsReady: false }
  }

  componentWillMount() {
    // const notification = await Tools.getNotification()
    // // console.log('notification', notification)
    // if (notification) {
    //   OneSignal.setLogLevel(7, 0)
    //   OneSignal.setRequiresUserPrivacyConsent(false)
    //   OneSignal.init(Config.OneSignal.appId, { kOSSettingsKeyAutoPrompt: true })
    // }
  }

  componentWillUnmount() {
    // const notification = await Tools.getNotification()
    // // console.log(notification)
    // if (notification) {
    //   OneSignal.removeEventListener('received', this.onReceived)
    //   OneSignal.removeEventListener('opened', this.onOpened)
    //   OneSignal.removeEventListener('ids', this.onIds)
    // }
  }

  async componentDidMount() {
    const notification = await Tools.getNotification()

    // init wooworker
    WooWorker.init({
      url: AppConfig.Website.url,
      consumerKey: AppConfig.Website.consumerKey,
      consumerSecret: AppConfig.Website.consumerSecret,
      wp_api: true,
      version: 'wc/v2',
      queryStringAuth: true,
    })

    // warn(['notification', notification])
    if (notification) {
      OneSignal.addEventListener('received', this.onReceived)
      OneSignal.addEventListener('opened', this.onOpened)
      OneSignal.addEventListener('ids', this.onIds)

      // expo
      registerForPushNotification()
      Notifications.addListener(this._handleNotification)
    }

    if (Config.Google.Analytic.enable) {
      const analytics = new Analytics(Config.Google.Analytic.TrackingId)
      analytics
        .hit(new PageHit('Home'))
        .then(() => {})
        .catch((e) => {})
    }
  }

  _handleNotification = (notification) => {
    // console.log('noti', notification)
  }

  onReceived = (notification) => {
    // log(['Notification received: ', notification])
  }

  onOpened = (openResult) => {
    // log(['Message: ', openResult.notification.payload.body])
    // log(['Data: ', openResult.notification.payload.additionalData])
    // log(['isActive: ', openResult.notification.isAppInFocus])
    // log(['openResult: ', openResult])
  }

  onIds = (device) => {
    // log(['Device info: ', device])
  }

  cacheImages = (images) => {
    return images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      }
      return Asset.fromModule(image).downloadAsync()
    })
  }

  cacheFonts = (fonts) => {
    return fonts.map((font) => Font.loadAsync(font))
  }

  loadAssets = async () => {
    // const imageAssets = this.cacheImages([Images.logo, Images.imageHolder])
    // const iconAssets = this.cacheImages(Images.icons)
    const fontAssets = this.cacheFonts([fontData])

    await Promise.all([
      // ...imageAssets,
      // ...iconAssets,
      ...fontAssets,
    ])

    // this.setState({ appIsReady: true, fontLoaded: true })
  }

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={store}>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ bottom: 'always', top: 'never' }}>
          <RootRouter />
        </SafeAreaView>
      </Provider>
    )
  }
}
