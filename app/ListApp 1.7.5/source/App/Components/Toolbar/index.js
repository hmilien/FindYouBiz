/** @format */

'use strict'

import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity, Image } from 'react-native'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import css from '@common/style'
import { IconImage } from '@components'
import { Constants, Config, Color, Events, Languages, Images } from '@common'
import { Layer } from '@navigation/Icons'
import { connect } from 'react-redux'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { layout: Constants.Layout.simple }
  }

  open = () => Events.openLeftMenu()

  changeLayout = (layout) => {
    this.setState({ layout: layout })
    Events.newsChangeLayout(layout)
    Events.readLaterChangeLayout()
  }

  render() {
    const self = this
    const { color } = this.props
    const logo = () => {
      if (typeof Constants.logo != 'undefined') {
        return <Image source={Images.logo} style={css.toolbarLogo} />
      }
      return (
        <Text style={[css.toolbarTitle, self.props.textColor]}>
          {Config.AppName}
        </Text>
      )
    }

    const homeButton = function() {
      if (typeof self.props.isChild != 'undefined') {
        const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }
        return (
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={self.props.action ? self.props.action : null}>
            <Icon
              name={'arrow-left'}
              size={16}
              color="#333"
              style={[
                Platform.OS === 'android' ? css.iconBackAndroid : css.iconBack,
                self.props.textColor,
              ]}
            />
            <Text style={[css.textBack, { marginLeft: 20 }]}>
              {Languages.back}
            </Text>
          </TouchableOpacity>
        )
      }
      return (
        <IconImage
          action={self.open}
          image={Images.icons.iconBurger}
          css={{ height: 30, width: 24, paddingLeft: 0 }}
          cssImage={{ tintColor: color, width: 18, height: 18 }}
        />
      )
    }

    return (
      <View
        style={[
          css.toolbarMenu,
          { backgroundColor: 'transparent' },
          this.props.css,
        ]}>
        {homeButton()}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {self.props.cardButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout != 1 && css.iconHide,
              ]}
              action={this.changeLayout.bind(this, 1)}
              image={{ uri: Images.icons.card }}
            />
          )}

          {self.props.newsLayoutButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout != 3 && css.iconHide,
              ]}
              action={this.changeLayout.bind(this, 3)}
              image={{ uri: Images.icons.layout }}
            />
          )}

          {self.props.listButton && (
            <IconImage
              cssImage={[
                { marginRight: 4 },
                this.state.layout != 2 && css.iconHide,
              ]}
              action={() => this.changeLayout(2)}
              image={{ uri: Images.icons.cardView }}
            />
          )}

          {self.props.listViewButton && (
            <IconImage
              cssImage={[
                { marginRight: 0 },
                this.state.layout != 4 && css.iconHide,
              ]}
              action={this.changeLayout.bind(this, 4)}
              image={{ uri: Images.icons.listView }}
            />
          )}

          {self.props.userButton && (
            <IconImage
              cssImage={{ marginRight: 0 }}
              image={{ uri: Images.icons.user }}
            />
          )}

          {self.props.searchButton && (
            <IconImage image={{ uri: Images.icons.search }} />
          )}

          {self.props.layer && Layer()}
        </View>
      </View>
    )
  }
}
const mapStateToProps = ({ config }) => ({ colorConfig: config.color })
export default connect(mapStateToProps)(Toolbar)
