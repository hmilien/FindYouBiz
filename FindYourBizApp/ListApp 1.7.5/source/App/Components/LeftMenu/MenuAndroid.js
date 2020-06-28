'use strict'
import React, { Component } from 'react'
import { DrawerLayoutAndroid } from 'react-native'
import SideMenu from './SideMenu'
import { Events, Config, Constants } from '@common'
import { Modal } from '@components'
import { connect } from "react-redux";

class MenuAndroid extends Component {
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
    if (typeof this.drawer != 'undefined') {
      this.drawer.closeDrawer()
    }
  }

  openSideMenu() {
    typeof this.drawer != 'undefined' && this.drawer.openDrawer()
  }

  render() {
    const { configMenu } = this.props

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={_drawer => (this.drawer = _drawer)}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => (
          <SideMenu
            menus={
              typeof configMenu != 'undefined'
                ? configMenu
                : Config.Local.menu
            }
            goToScreen={this.props.goToScreen}
          />
        )}
      >
        {this.props.routes}
      </DrawerLayoutAndroid>
    )
  }
}

const mapStateToProps = ({ config }) => ({ configMenu: config.menu })
export default connect(mapStateToProps)(MenuAndroid)