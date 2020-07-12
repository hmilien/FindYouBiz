/** @format */

import { StyleSheet } from 'react-native'
import {Config} from '@common'
import Color from '../../../Common/Color';

export default StyleSheet.create({
  container:{
    flexDirection: 'row',
  },
  avatar:{
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  wrap:{
    flex:1
  },
  name:{
    fontSize: 14,
  },
  time:{
    fontSize: 12,
    marginTop: 5,
    color: 'rgba(191, 192, 192, 1)'
  },
  follow:{
    fontSize: 14,
    color: '#000'
  },
  btnFollow:{
    width: 70,
    height: 32,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.main
  }
})
