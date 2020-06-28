/** @format */

import React from 'react'
import { Platform, StatusBar, View, StyleSheet } from 'react-native'
import { Modal, Board } from '@components'
import { NetInfo, Toast } from '@container'
import { IntroData, AppConfig, Languages, Constants, Config } from '@common'
import { connect } from 'react-redux'
import { fetchConfig, setChat } from '@redux/actions'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Navigation from '@navigation'

import MenuScale from '@components/LeftMenu/MenuScale'
import MenuOverlay from '@components/LeftMenu/MenuOverlay'
import MenuSmall from '@components/LeftMenu/MenuSmall'
import MenuWide from '@components/LeftMenu/MenuWide'
import MenuAndroid from '@components/LeftMenu/MenuAndroid'
import firebaseApp from '@services/Firebase'
import * as FacebookAds from 'expo-ads-facebook';
import * as Localization from 'expo-localization';


class RootRouter extends React.PureComponent {
  // constructor(props) {
  // super(props)
  // Set Default Language for App
  // Languages.setLanguage(Config.Language);
  // }

  async componentDidMount() {
    await Languages.setLocale(this.props.lang)


    const { locale } = await Localization.getLocalizationAsync();

    this.props.fetchConfig()
    setInterval(() => {
      firebaseApp.on((snapshot) => {
        const { user } = this.props
        var key = snapshot.key.split('-')[1]
        if (user != null) {
          if (user.id == key) {
            this.props.setChat(snapshot.val())
          }
        }
      })
    }, 5000)

    //set FacebookAds

    this.props.general.Facebook.visible &&
      FacebookAds.AdSettings.addTestDevice(
        FacebookAds.AdSettings.currentDeviceHash
      )
  }

  goToScreen = (routeName, params) => {
    const { navigator } = this.refs
    navigator.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })
  }

  renderLeftMenu = () => {
    const { small, wide, overlay } = Constants.LeftMenu
    const { tabbarColor, tabbarTint } = this.props
    const MainNavigator = createAppContainer(
      createBottomTabNavigator(Navigation.tabs, {
        ...Navigation.config,
        tabBarOptions: {
          activeTintColor: tabbarTint,
          inactiveTintColor: tabbarColor,
        },
      })
    )
    const menuProps = {
      goToScreen: this.goToScreen,
      routes: <MainNavigator ref="navigator" />,
    }

    if (Platform.OS === 'android') {
      return <MenuAndroid {...menuProps} />
    }

    switch (Config.LeftMenuStyle) {
      case small:
        return <MenuSmall {...menuProps} />
      case wide:
        return <MenuWide {...menuProps} />
      case overlay:
        return <MenuOverlay {...menuProps} />
      default:
        return <MenuScale {...menuProps} />
    }
  }

  render() {
    if (!this.props.introStatus) {
      return <Board data={IntroData} />
    }

    return (
      <View style={styles.safe} >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          // hidden={Device.isIphoneX ? false : !Config.showStatusBar}
        />
        {this.renderLeftMenu()}
        <NetInfo />
        <Modal.Comment />
        <Toast />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    // ...Platform.select({
    //   ios: {
    //     marginTop: Device.isIphoneX ? -8 : -20,
    //     marginBottom: Device.isIphoneX ? -20 : 0,
    //   },
    // }),
    ...Platform.select({
      android: {
        marginTop: 20,
      },
    }),
    backgroundColor: '#fff',
  },
})

const mapStateToProps = ({ skip, config, user, language }) => ({
  introStatus: skip.status,
  tabbarTint: config.color.tabbarTint
    ? config.color.tabbarTint
    : AppConfig.MainColor.tabbarTint,
  tabbarColor: config.color.tabbarColor
    ? config.color.tabbarColor
    : AppConfig.MainColor.tabbarColor,
  lang: language.lang,
  user: user.data,
  general: config.general,
})
export default connect(
  mapStateToProps,
  { fetchConfig, setChat }
)(RootRouter)
