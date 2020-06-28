import { StyleSheet, Platform } from 'react-native'
import Color from '@common/Color'

export default StyleSheet.create({
  backgroundColor:{
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex:1,
    justifyContent:'flex-end'
  },
  content:{
    marginHorizontal: 15,
    marginBottom: 10
  },
  wrapper:{
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10
  },
  title:{
    marginVertical:15,
    textAlign:'center',
    fontSize: 13,
    color: 'rgba(143,145,145,1)'
  },
  separator:{
    height: 0.5,
    backgroundColor: 'rgba(143,145,145,1)'
  },
  btnCancel:{
    height: 50,
    backgroundColor:'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 15,
    color: Color.appColor
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30
  },
  icon:{
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },

})
