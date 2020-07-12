'use strict'
import React, { Component } from 'react'
import Drawer from '@custom/react-native-drawer'
import SideMenu from './SideMenuBackGround'
import css from './style'
import { Events, Config } from '@common'
import { Modal } from '@components'
import { connect } from "react-redux";

class MenuWide extends Component {
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
    typeof this.refs.drawer != 'undefined' && this.refs.drawer.open()
  }

  render() {
    const { configMenu } = this.props
    return (
      <Drawer
        ref="drawer"
        type="static"
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose={true}
        captureGestures={true}
        panCloseMask={0.2}
        panThreshold={0.2}
        openDrawerOffset={0.2}
        content={
          <SideMenu
            menus={
              typeof configMenu != 'undefined'
                ? configMenu
                : Config.Local.menu
            }
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff', backgroundColor: 'transparent' }}
            iconStyle={css.iconWide}
            menuBody={css.menuColorWide}
          />
        }
      >
        {this.props.routes}
      </Drawer>
    )
  }
}

const mapStateToProps = ({ config }) => ({ configMenu: config.menu })

export default connect(mapStateToProps)(MenuWide)