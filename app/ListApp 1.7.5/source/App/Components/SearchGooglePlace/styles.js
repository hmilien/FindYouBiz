/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { Color, Constants } from '@common';

export default StyleSheet.create({
  textInputContainer: {
    borderTopWidth: 0,
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#fff',
    
  },
  textInput: {
    marginBottom: 6,
    marginLeft: 30,
    flex: 1,
    fontSize: 14,
    paddingLeft: 4,
    fontFamily: Constants.fontFamily,
    textAlign: 'center',
    backgroundColor: '#eee',
    borderRadius: 40,

    ...Platform.select({
      ios: {
        marginTop: 15,
        paddingVertical: 6
      },
      android: {
        marginTop: 10, 
        padding: 0
      } 
    })
  },

  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
  },
  listResult: {
    backgroundColor: '#fff',
    margin: 10,
    // zIndex: 9999,
    top: 50,
    // right: 0,
    // left: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    elevation: 5,
  },
  descContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  description: {
    fontWeight: 'bold',
  },
  btnFilSearch: {
    marginTop: 6,
    marginHorizontal: 10,
    zIndex: 999,
    marginRight: 15,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 0.1
  },
  iconSearchAdvance: {
    width: 18,
    height: 18,
    tintColor: Color.searchButton,
    resizeMode: 'contain'
  },
  iconSearchAdvance: {
    width: 18,
    height: 18,
    tintColor: Color.searchButton,
    resizeMode: 'contain',
  },
});
