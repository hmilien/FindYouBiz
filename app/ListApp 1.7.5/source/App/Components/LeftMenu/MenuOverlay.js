'use strict'
import React, { Component } from 'react'
import Drawer from '@custom/react-native-drawer'
import SideMenu from './SideMenu'
import css from './style'
import { Events, Config, Constants } from '@common'
import { Modal } from '@components'
import { connect } from "react-redux";

class MenuOverlay extends Component {
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
    const drawerStyles = {
      drawer: { backgroundColor: 'rgba(37, 149, 242, 0.5)' },
    }
    const { configMenu } = this.props

    return (
      <Drawer
        ref="drawer"
        type="overlay"
        tapToClose={true}
        panCloseMask={0.2}
        openDrawerOffset={0.2}
        styles={drawerStyles}
        content={
          <SideMenu
            menus={
              typeof configMenu != 'undefined'
                ? configMenu
                : Config.Local.menu
            }
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff' }}
            rowStyle={{ borderTopWidth: 0 }}
            menuBody={css.menuOverlay}
          />
        }
      >
        {this.props.routes}
      </Drawer>
    )
  }
}

const mapStateToProps = ({ config }) => ({ configMenu: config.menu })

export default connect(mapStateToProps)(MenuOverlay)