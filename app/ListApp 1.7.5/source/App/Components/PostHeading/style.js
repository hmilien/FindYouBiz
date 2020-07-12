import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container:{
    borderBottomWidth: 0.5,
    borderColor:"#E6ECEE",
  },
  title:{
    fontSize: 20,
    color: '#282828',
    marginBottom: 10,
    marginTop: 20,
  },
  input:{
    height: 30,
    padding: 0,
    fontSize: 16,
    color: 'black',
  },
  required:{
    borderColor:"red"
  }
})
