/** @format */

'use strict'
import React, { Component } from 'react'
import Drawer from '@custom/react-native-drawer'
import SideMenu from './SideMenu'
import { Events, Config, Constants } from '@common'
import { connect } from 'react-redux'

class MenuScale extends Component {
  componentDidMount() {
    this.sideMenuClick = Events.onOpenLeftMenu(this.openSideMenu.bind(this))
    this.sideMenuClose = Events.onCloseLeftMenu(this.closeSideMenu.bind(this))
  }

  componentWillUnmount() {
    //Remove drawer event
    this.sideMenuClick.remove()
    this.sideMenuClose.remove()
  }

  closeSideMenu() {
    if (typeof this.refs.drawer != 'undefined') {
      this.refs.drawer.close()
    }
  }

  openSideMenu() {
    this.refs.drawer.open()
  }

  render() {
    const { configMenu } = this.props
    return (
      <Drawer
        ref="drawer"
        type="static"
        side={Constants.RTL ? 'right' : 'left'}
        isScale={true}
        captureGestures={true}
        backgroundColor="#FFFFFF"
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose={true}
        panCloseMask={0.4}
        openDrawerOffset={0.4}
        content={
          <SideMenu
            menus={
              typeof configMenu != 'undefined'
                ? configMenu
                : Config.Local.menu
            }
            goToScreen={this.props.goToScreen}
          />
        }>
        {this.props.routes}
      </Drawer>
    )
  }
}

const mapStateToProps = ({ config }) => ({ configMenu: config.menu })

export default connect(mapStateToProps)(MenuScale)
