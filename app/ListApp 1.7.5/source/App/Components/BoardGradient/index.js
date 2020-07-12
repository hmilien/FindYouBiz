/** @format */

import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Swiper from 'react-native-swiper'
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import { Languages, Config, Color } from '@common'
import { updateSkip } from '@redux/actions'
import { connect } from 'react-redux'
import { ErrorCombound } from '@components'

class Index extends Component {
  constructor(props) {
    super(props)
    this.index = 0
  }

  onSkip = () => this.props.updateSkip(true)

  render() {
    const PAGES = this.props.data

    return (
      <ErrorCombound>
        <View style={styles.container}>
          <Animatable.Image
            animation="fadeInDown"
            iterationCount="infinite"
            duration={9000}
            direction="alternate"
            source={require('images/background.png')}
            style={styles.background}
          />
          <Swiper
            ref={(ref) => (this.swiper = ref)}
            dot={<View style={styles.dot} />}
            autoplay={false}
            loop={false}
            onIndexChanged={this.onIndexChanged}
            activeDot={<View style={styles.dotActive} />}
            paginationStyle={{ bottom: 50, right: 0 }}>
            {PAGES.map((page, i) => (
              <LinearGradient
                key={i}
                style={styles.linear}
                colors={[
                  Config.Board.enable
                    ? Color.board.bgColor
                    : 'rgba(22, 160, 133, .6)',
                  'rgba(22, 160, 133, 0)',
                  Config.Board.enable
                    ? Color.board.bgColor
                    : 'rgba(22, 160, 133, .6)',
                ]}>
                <View style={[styles.page]}>
                  <View style={[styles.card]}>
                    <View>
                      <Text style={styles.title}>{page.title}</Text>
                    </View>
                    <Text style={styles.desc}>{page.description}</Text>
                  </View>
                  <Image style={styles.icon} source={page.iconImage} />
                </View>
              </LinearGradient>
            ))}
          </Swiper>
          <TouchableOpacity style={styles.wrapSkip} onPress={this.onSkip}>
            <Text style={styles.skip}>{Languages.skip}</Text>
          </TouchableOpacity>
        </View>
      </ErrorCombound>
    )
  }
}

export default connect(
  null,
  { updateSkip }
)(Index)
