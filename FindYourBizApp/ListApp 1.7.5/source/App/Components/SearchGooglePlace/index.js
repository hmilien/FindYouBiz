/** @format */

import React, { PureComponent } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import { Images, Config } from '@common'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import SearchGoogleItem from './SearchGoogleItem'
import styles from './styles'

const hitSlop = { top: 15, right: 15, left: 15, bottom: 15 }

export default class GooglePlacesInput extends PureComponent {
  _onFilter = () => {}

  render() {
    const { onPress, style } = this.props

    return (
      <GooglePlacesAutocomplete
        placeholder="Search by Suburb..."
        minLength={2}
        autoFocus={false}
        returnKeyType="search"
        listViewDisplayed={false}
        fetchDetails
        renderRow={(row) => {
          return <SearchGoogleItem row={row} />
        }}
        onPress={(data, details = null) => {
          onPress(data, details)
        }}
        query={{
          key: Config.Google.mapApi,
          language: 'en-Au',
          components: 'country:' + Config.Google.searchCountry,
        }}
        styles={{
          container: style,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listResult,
          description: styles.description,
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'cities',
          radius: 5000,
        }}
        debounce={500}
        // renderRightButton={() => (
        //   <TouchableOpacity
        //     style={styles.btnFilSearch}
        //     hitSlop={hitSlop}
        //     onPress={this._onFilter}>
        //     <Image
        //       source={Images.icons.iconFilterSearch}
        //       style={styles.iconSearchAdvance}
        //     />
        //   </TouchableOpacity>
        // )}
        enablePoweredByContainer={false}
        onNotFound={null}
      />
    )
  }
}
