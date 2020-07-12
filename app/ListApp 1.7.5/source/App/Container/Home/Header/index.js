/** @format */

import React from 'react'
import { Animated, Dimensions, View, StatusBar, Text } from 'react-native'
import { Config } from '@common'
import SearchBox from './SearchBox'

const { width, height } = Dimensions.get('window')

export default class Header extends React.PureComponent {
  state = {
    scaleAnimation: new Animated.Value(1),
    opacityText: new Animated.Value(0),
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.scaleAnimation, {
          toValue: 1.2,
          duration: 6000,
        }),
        Animated.timing(this.state.scaleAnimation, {
          toValue: 1,
          duration: 6000,
        }),
      ])
    ).start()

    Animated.timing(this.state.opacityText, {
      toValue: 1,
      duration: 3000,
    }).start();
  }

  render() {
    const { scrollY, onViewSearch } = this.props
    const headerTranslateY = scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    })
    const searchTranslateY = scrollY.interpolate({
      inputRange: [0, 30, 60],
      outputRange: [0, -15, -30],
      extrapolate: 'clamp',
    })

    const opacityText = scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
      extrapolate: 'clamp',
    })

    // const scale = scrollY.interpolate({
    //   inputRange: [-100, 0],
    //   outputRange: [1.2, 1],
    //   extrapolate: 'clamp',
    // })

    return (
      <Animated.View
        style={[
          styles.container,
          {
            //   opacity: animateOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}>
        <View style={styles.header}>
          <Animated.Text style={[styles.title, { opacity: opacityText }]}>
            {'Browse anything!\nExplore your city'}
          </Animated.Text>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale: this.state.scaleAnimation,
                  },
                ],
              },
            ]}
            source={Config.Local.BannerHeader.image}
          />
          <StatusBar backgroundColor="blue" barStyle="light-content" />
        </View>
        <Animated.View
          style={[
            styles.search,
            {
              transform: [{ translateY: searchTranslateY }],
            },
          ]}>
          <SearchBox onPress={onViewSearch} />
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = {
  container: {
    // marginBottom: 10,
  },
  image: {
    width,
    height:
      Config.Local.BannerHeader && Config.Local.BannerHeader.large
        ? height / 2
        : 250,
  },
  header: {
    width,
    height:
      Config.Local.BannerHeader && Config.Local.BannerHeader.large
        ? height / 2
        : 250,
    overflow: 'hidden',
  },
  title: {
    width: width * 0.8,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 10,
    fontWeight: '600',
    fontSize: 28,
    color: '#FFF',
    marginBottom: 10,
    zIndex: 9999,
    position: 'absolute',
  },
  search: {
    marginTop: -20,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFF',
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'space-between',
    borderRadius: 3,
    width: 165,
    marginLeft: 20,
  },
  icon: {
    marginLeft: 7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
  },
}
