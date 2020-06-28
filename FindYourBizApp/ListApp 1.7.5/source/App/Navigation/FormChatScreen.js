/** @format */

import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

class FormChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  }

  state = {
    name: '',
  }

  componentDidMount() {
    const { user, navigation } = this.props
    if(user != null){
      let isExist = user.username.search('@')
      this.props.navigation.navigate('chat', {
        name: isExist != -1 ? user.username.split('@')[0]: user.username,
        author: navigation.state.params.author,
      })
    }
  }

  onPress = () => {
    const { state } = this.props.navigation
    this.props.navigation.navigate('chat', {
      name: this.state.name,
      author: state.params.author,
    })
  }

  onChangeText = (name) => this.setState({ name })

  render() {
    return (
      <SafeAreaView style={{flex: 1}}> 
        <Text style={styles.title}>{'Enter your username:'}</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="John Cena"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>{'Next'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const offset = 24
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
})

const mapStateToProps = ({user}) => ({user: user.data})
export default connect(mapStateToProps)(FormChatScreen)