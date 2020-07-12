'use strict'
import React, { Component } from 'react'
import Drawer from '@custom/react-native-drawer'
import SideMenu from './SideMenuIcons'
import css from './style'
import { Events, Config } from '@common'
import { Modal } from '@components'
import { connect } from "react-redux";

class MenuSmall extends Component {
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
        backgroundColor="#34BC99"
        captureGestures={true}
        panCloseMask={0.7}
        panThreshold={0.7}
        openDrawerOffset={0.7}
        content={
          <SideMenu
            menus={
              typeof configMenu != 'undefined'
                ? configMenu
                : Config.Local.menu
            }
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff' }}
            menuBody={{ backgroundColor: '#34BC99' }}
          />
        }
      >
        {this.props.routes}
      </Drawer>
    )
  }
}
const mapStateToProps = ({ config }) => ({ configMenu: config.menu })

export default connect(mapStateToProps)(MenuSmall)