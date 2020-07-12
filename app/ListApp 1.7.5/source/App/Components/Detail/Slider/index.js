/** @format */

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { Languages, Color } from '@common'
import styles from './style'
import Slider from 'react-native-slider'

class FontSlider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      height: 0,
    }
  }

  render() {
    let { value } = this.state
    let { onValueChange } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{Languages.small}</Text>
          <Text style={styles.text}>{Languages.normal}</Text>
          <Text style={styles.text}>{Languages.large}</Text>
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.smallText}>A</Text>
          <View style={{ flex: 1 }}>
            <View style={[styles.dotWrap, { top: 6 + this.state.height / 2 }]}>
              <View style={styles.dotStyle} />
              <View style={styles.dotStyle} />
              <View style={styles.dotStyle} />
              <View style={styles.dotStyle} />
              <View style={styles.dotStyle} />
            </View>

            <Slider
              style={styles.slider}
              value={value}
              step={0.25}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              minimumTrackTintColor={Color.appColor}
              onSlidingComplete={onValueChange}
              onLayout={(e) =>
                this.setState({ height: e.nativeEvent.layout.height })
              }
            />
          </View>
          <Text style={styles.largeText}>A</Text>
        </View>
      </View>
    )
  }
}

export default FontSlider
