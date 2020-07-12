/** @format */
import React, { PureComponent } from 'react'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { Map, Search } from '@container'
import { TabBarEx } from '@components'
import { Ionicons } from '@expo/vector-icons'
import { TabView, SceneMap } from 'react-native-tab-view'
import Languages from '../Common/Languages'
const { width } = Dimensions.get('window');
import { SafeAreaView } from 'react-navigation';

export default class MapScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({ header: null })

  state = {
    index: 0,
    routes: [
      {
        key: 'first',
        title: Languages.List,
      },
      {
        key: 'second',
        title: Languages.Map,
      },
    ],
  }

  MapView = () => {
    const { navigate } = this.props.navigation
    return (
      <Map
        onBack={() => navigate('home')}
        onViewList={() => navigate('search')}
        onViewPost={(post, index, isMap) =>
          navigate('postDetail', { post, index, isMap, backToRoute: 'map' })
        }
        onViewFilter={() => navigate('filter')}
      />
    )
  }

  SearchView = () => {
    const { navigate } = this.props.navigation
    return (
      <Search
        onViewPost={(post, index) =>
          navigate('postDetail', {
            post,
            index,
            fromSearch: true,
            backToRoute: 'search',
          })
        }
        onViewMap={() => navigate('map')}
        onViewCategory={(item) =>
          navigate('category', {
            mainCategory: item,
            fromSearch: true,
          })
        }
        onViewFilter={() => navigate('filter')}
      />
    )
  }

  _renderIcon = ({ route }) => (
    <Ionicons name={route.icon} size={24} color="#ccc" />
  )

  _renderTabBar = (props) => {
    return (
      <TabBarEx
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
        labelStyle={styles.label}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TabView
          navigationState={this.state}
          style={styles.container}
          renderTabBar={this._renderTabBar}
          renderIcon={this._renderIcon}
          renderScene={SceneMap({ first: this.SearchView, second: this.MapView })}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 0,
    borderWidth: 0,
  },
  tabbar: {
    color: '#333',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        // remove the line under
        shadowOpacity: 0,
      },
      android: {
        paddingTop: 13,
        elevation: 0,
      },
    }),
  },

  label: {
    color: '#333',
    margin: 0,
    ...Platform.select({
      ios: {
        marginTop: -15,
      },
      android: {},
    }),
  },

  indicator: {
    backgroundColor: '#333',
    height: 2,
    borderRadius: 3,
    width: 30,
    marginLeft: width * 0.25 - 15,
  },
})
