/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'

import { error, Color, Tools, Images } from '@common'
import { SearchGooglePlace } from '@components'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import isEqual from 'lodash/isEqual'
import { connect } from 'react-redux'
import {
  setRegionMap,
  fetchNearestLocations,
  searchPosts,
  stopSearch,
} from '@redux/actions'
import MapDetail from './Detail'

import styles from './styles'
import Languages from '../../Common/Languages'

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 4000,
}
const ANCHOR = { x: 0.5, y: 0.5 }
const ANCHOR_DETAIL = { x: 0.5, y: 1 }
const ANCHOR_ANDROID = { x: 0, y: -1.5 }

const CENTER = { x: 0, y: 0 }
const CENTER_DETAIL = { x: 5, y: 3 }
const CENTER_ANDROID = { x: 0, y: -3 }

class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.MARKERS = []
    this.state = {
      myPosition: null,
    }
  }

  openMap = () => {
    const { latitude, longitude } = this.props.initialRegion
    let url = `https://maps.apple.com/?ll=${latitude},${longitude}`
    let urlGG = `https://google.com/maps/place/${latitude},${longitude}`
    WebBrowser.openBrowserAsync(Platform.OS == 'ios' ? url : urlGG)
  }

  async componentDidMount() {
    //Check if is map screen
    await this.getMyCurrentLocation();
    setTimeout(() => this.markerItem && this.markerItem.showCallout(), 1000);
  }

  componentWillUnmount() {
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID)
  }

  async getMyCurrentLocation() {
    if (Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)

      if (status !== 'granted') {
        error(' to access location was denied')
      } else {
        this.watchLocation()
      }
    } else {
      this.watchLocation()
    }
  }

  watchLocation() {
    const { setRegionMap, fetchNearestLocations } = this.props
    if (Platform.OS === 'ios') {
      this.watchID = navigator.geolocation.watchPosition(
        (position) => {
          const myLastPosition = this.state.myPosition
          const myPosition = position.coords
          if (!isEqual(myPosition, myLastPosition)) {
            this.setState({ myPosition })
            // warn(this.state.myPosition)
            const current = {
              address_lat: myPosition.latitude,
              address_long: myPosition.longitude,
            }
            setRegionMap(current)
            fetchNearestLocations(
              true,
              myPosition.latitude,
              myPosition.longitude
            )
          }
        },
        null,
        this.props.geolocationOptions
      )
    } else {
      Location.getCurrentPositionAsync({}).then((position) => {
        const myLastPosition = this.state.myPosition
        const myPosition = position.coords
        if (!isEqual(myPosition, myLastPosition)) {
          this.setState({ myPosition })
          const current = {
            address_lat: myPosition.latitude,
            address_long: myPosition.longitude,
          }
          setRegionMap(current)
          fetchNearestLocations(true, myPosition.latitude, myPosition.longitude)
        }
      })
    }
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index, true)
  }

  renderCalloutMaker = (item, index) => {
    const name = typeof item.title !== 'undefined' ? item.title.rendered : ''
    const location = item.job_location
    const phone = item.phone

    return (
      <MapView.Callout onPress={() => this.onViewPost(item, index)}>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={true}
          style={styles.slideInnerContainer}
          key={`calloutMarker-${index + 1}`}
          onPress={() => this.onViewPost(item, index)}>
          <View style={styles.wrapText}>
            <View
              style={styles.row}
              onPress={() => this.onViewPost(item, index)}>
              <Text style={[styles.title]}>
                {Tools.getDescription(name, 100)}
              </Text>
            </View>
            <View style={styles.row}>
              {Platform.OS == 'ios' && (
                <Image style={styles.imageIcon} source={Images.icons.iconPin} />
              )}
              <Text style={styles.text}>{location}</Text>
            </View>
            <View
              activeOpacity={0.9}
              onPress={this.openPhone}
              style={styles.row}>
              {Platform.OS === 'ios' && (
                <Image
                  style={styles.imageIcon}
                  source={Images.icons.iconPhone}
                />
              )}
              <Text style={styles.text}>{phone}</Text>
            </View>

            <Text style={styles.textMore}>{Languages.readMore + '...'}</Text>
          </View>
        </TouchableOpacity>
      </MapView.Callout>
    )
  }

  renderMarkers = () => {
    const {
      listMarkers,
      latitudeDelta,
      longitudeDelta,
      isSearching,
      listMarkersSearch,
    } = this.props

    let listMarkersRender = listMarkers
    if (isSearching) {
      listMarkersRender = listMarkersSearch
    }

    const list =
      typeof listMarkersRender !== 'undefined' ? (
        listMarkersRender.map((item, index) => {
          let coordinate = {
            latitude: parseFloat(item.address_lat),
            longitude: parseFloat(item.address_long),
            latitudeDelta,
            longitudeDelta,
          }
          // warn(['markerItemMap', index]);
          return (
            <MapView.Marker
              key={'marker-' + index}
              ref={`marker${index}`}
              anchor={ANCHOR}
              centerOffset={CENTER}
              coordinate={coordinate}
              pinColor={Color.map.defaultPinColor}
              style={[styles.marker]}>
              {this.renderCalloutMaker(item, index)}
            </MapView.Marker>
          )
        })
      ) : (
        <View />
      )
    return list
  }

  _stopSearch = () => {
    this.props.stopSearch()
  }

  _onSelectPlace = (data, detail) => {
    const { geometry } = detail;
    const current = {
      address_lat: geometry && geometry.location && geometry.location.lat,
      address_long: geometry && geometry.location && geometry.location.lng,
    };
    this._updateMarkerAndRegion(current);
  };

  _updateMarkerAndRegion = (current = {}) => {
    if (current.address_lat !== 0 || current.address_long !== 0) {
      this.props.fetchNearestLocations(
        true,
        current.address_lat,
        current.address_long
      );
      this.props.setRegionMap(current);
    }
  };

  render() {
    const {
      initialRegion,
      isPostDetail,
      css,
      cssMap
    } = this.props
    if (isPostDetail) {
      return <MapDetail {...this.props} />
    }

    return (
      <View style={[styles.container, css & css]}>
        <SearchGooglePlace
          style={styles.searchBar}
          onPress={this._onSelectPlace}
        />
        <MapView
          style={[styles.map, cssMap && cssMap]}
          ref={(ref) => (this.map = ref)}
          region={initialRegion}
          loadingEnabled
          showsUserLocation={true}
          userLocationAnnotationTitle={"You're Here"}
          loadingIndicatorColor={Color.map.loading}>
          {this.renderMarkers()}
        </MapView>
      </View>
    )
  }
}

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
}

MapView.defaultProps = defaultProps

const mapStateToProps = ({ map }) => {
  return {
    listMarkers: map.markers,
    listMarkersSearch: map.searchMarkers,
    initialRegion: map.region,
    latitudeDelta: map.latitudeDelta,
    longitudeDelta: map.longitudeDelta,
    isSearching: map.isSearching,
    indexActive: map.index,
  }
}
export default connect(
  mapStateToProps,
  {
    setRegionMap,
    fetchNearestLocations,
    searchPosts,
    stopSearch,
  }
)(Index)
