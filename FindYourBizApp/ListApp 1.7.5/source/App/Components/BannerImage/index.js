/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import { TouchableScale } from '@components'
import { Tools, Constants } from '@common'
const { width } = Dimensions.get('window')

export default class BannerImage extends PureComponent {
  renderHeader = () => {
    const { config } = this.props
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.header}>
        <Text
          style={[
            styles.headerText,
            config.textColor && { color: config.textColor },
          ]}>
          {Tools.formatText(config.name)}
        </Text>
      </TouchableOpacity>
    )
  }

  renderDescription = () => {
    const { config } = this.props
    return (
      <Text
        style={[
          styles.headerDesc,
          config.textColor && { color: config.textColor },
        ]}>
        {config.description}
      </Text>
    )
  }

  render() {
    const { viewAll, config } = this.props
    const column = config.column || 1
    const full = config.full
    const height = config.height || width / column - 20
    const resizeMode = config.imageMode || 'contain'

    return (
      <TouchableScale
        style={styles.wrapBannerView(column, full)}
        onPress={viewAll}>
        {config.name != '' && this.renderHeader()}
        {config.description != '' && this.renderDescription()}
        <View
          activeOpacity={1}
          style={styles.imageBannerView(column, height, full)}>
          <Image
            source={config.imageBanner}
            style={styles.imageBanner(resizeMode, full)}
          />
        </View>
      </TouchableScale>
    )
  }
}

const styles = {
  wrapBannerView: (column, full) => ({
    width: full ? width : width / column - 10,
  }),
  imageBannerView: (column, height, full) => ({
    width: full ? width : width / column - 10,
    height: height,
    borderRadius: full ? 0 : 9,
    marginLeft: full ? 0 : 10,
    marginRight: full ? 0 : 10,
    marginTop: 4,
    overflow: 'hidden',
  }),
  imageBanner: (resizeMode, full) => ({
    flex: 1,
    resizeMode: resizeMode,
    width: full ? width : null,
  }),
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    color: '#333',
    marginBottom: 4,
    fontFamily: Constants.fontFamilyBold,
  },
  headerDesc: {
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 12,
    color: '#444',
    width: width * 0.8,
    fontFamily: Constants.fontFamilyLight,
  },
}
