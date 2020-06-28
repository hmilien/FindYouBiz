/** @format */

// @flow
import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Device, Languages } from '@common'
import { AnimatedHeader } from '@components'
import { ChatList } from '@container';
import { SafeAreaView } from 'react-navigation';

export default class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  state = {
    scrollY: new Animated.Value(0),
  }

  render() {
    const { navigate } = this.props.navigation
    let { scrollY } = this.state
    return (
      <SafeAreaView style={styles.body}>
        <AnimatedHeader label={Languages.chatList} scrollY={scrollY} />
        <Animated.ScrollView
          ref={(sc) => (this._scroll = sc)}
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}>
          <ChatList
            onChat={(author) => navigate('chat', { author, backToRoute: 'chatList' })}
            onLogin={() => navigate('login')}
            onHome={() => navigate('home')}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
  },
})
