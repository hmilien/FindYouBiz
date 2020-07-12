import { StyleSheet, Platform } from 'react-native'
import Color from '@common/Color'

export default StyleSheet.create({
  container:{
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  text:{
    fontSize: 12,
    color: 'rgba(143,145,145,1)'
  },
  smallText:{
    fontSize: 12,
    color: Color.appColor,
    marginRight: 5,
  },
  largeText:{
    fontSize: 16,
    color: Color.appColor,
    marginLeft: 5
  },
  slider:{
    flex:1
  },
  trackStyle:{
    height: 2,
    backgroundColor: Color.appColor
  },
  thumbStyle:{
    width: 16,
    height: 16,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: Color.appColor,
    borderRadius: 8
  },
  dotStyle:{
    width:8,
    height:8,
    borderRadius: 4,
    backgroundColor: Color.appColor
  },
  dotWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    position:'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})
