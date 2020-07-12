/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, I18nManager } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import styles from './styles'

export default class UserProfileItem extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    icon: false,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { label, value, onPress, icon, chat } = this.props
    return (
      <View style={styles.row}>
        <Text style={styles.leftText}>{label}</Text>
        <TouchableOpacity onPress={onPress} style={styles.rightContainer}>
          <Text style={styles.rightText}>{value}</Text>
          {icon &&
            _.isBoolean(icon) && (
              <Icon
                style={[
                  styles.icon,
                  I18nManager.isRTL && {
                    transform: [{ rotate: '180deg' }],
                  },
                ]}
                color="#CCCCCC"
                size={22}
                name="ios-arrow-forward"
              />
            )}
          {icon && !_.isBoolean(icon) && icon()}
        </TouchableOpacity>
      </View>
    )
  }
}

