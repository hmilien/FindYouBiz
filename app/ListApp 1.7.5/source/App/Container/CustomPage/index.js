/** @format */

'use strict'

import React, { Component } from 'react'
import { View, SafeArea, ScrollView } from 'react-native'
import Api from '@services/Api'
import WebView from '@components/WebView'
import { Toolbar } from '@components'

export default class CustomPage extends Component {
  constructor(props) {
    super(props)
    this.state = { html: '' }
    this.fetchPostData = this.fetchPostData.bind(this)
  }

  componentDidMount() {
    this.fetchPostData()
  }

  fetchPostData() {
    const id = this.props.id

    Api.getPages({ id: id }).then((data) => {
      this.setState({
        html:
          typeof data.content !== 'undefined'
            ? data.content.rendered
            : 'Content is updating',
      })
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.html !== nextProps.html
  }

  render() {
    return (
    
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <Toolbar />
          <WebView
            style={{
              backgroundColor: '#FFF',
              marginHorizontal: 10,
              marginTop: 15,
            }}
            html={this.state.html}
          />
        </ScrollView>
      
    )
  }
}
