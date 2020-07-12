/** @format */

import React, { PureComponent } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native'
import { Images } from '@common'
import { debounce } from 'lodash'
import { Color, Constants } from '@common'

class SearchBar extends PureComponent {
  _onSearch = debounce((searchText) => {
    if (searchText.trim().length > 2) {
      this.props.onSearch(this.props.isMap, searchText)
    } else {
      this.props.stopSearch()
    }
  }, 500)

  _onFilter = () => {
    this.props.onViewFilter()
  }

  render() {
    const hitSlop = {
      top: 15,
      right: 15,
      left: 15,
      bottom: 15,
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search by name..."
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholderTextColor="#999"
          underlineColorAndroid={'transparent'}
          clearButtonMode={'while-editing'}
          onChangeText={this._onSearch}
        />
        <TouchableOpacity
          style={styles.btnFilSearch}
          hitSlop={hitSlop}
          onPress={this._onFilter}>
          <Image
            source={Images.icons.iconFilterSearch}
            style={styles.iconSearchAdvance}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    left: 0,
    top: 0,
    alignItems: 'center',
  },
  searchIcon: {
    width: 16,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
    marginTop: 5,
  },
  input: {
    marginBottom: 6,
    marginLeft: 30,
    flex: 1,
    fontSize: 15,
    paddingLeft: 4,
    fontFamily: Constants.fontFamily,
    textAlign: 'center',
    backgroundColor: '#eee',
    borderRadius: 40,

    ...Platform.select({
      ios: {
        marginTop: 15,
        paddingVertical: 6,
      },
      android: {
        marginTop: 10,
        padding: 0,
      },
    }),
  },
  btnFilSearch: {
    marginTop: 6,
    marginHorizontal: 10,
    zIndex: 999,
    marginRight: 15,

    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  iconSearchAdvance: {
    width: 18,
    height: 18,
    tintColor: Color.searchButton,
    resizeMode: 'contain',
  },
})

export default SearchBar
