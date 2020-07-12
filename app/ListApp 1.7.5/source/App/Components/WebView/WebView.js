import React, { Component } from 'react'
import { WebView, View, Platform, Dimensions } from 'react-native'
const { width, height, scale } = Dimensions.get('window')

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      webViewHeight: 600,
    }
  }

  updateHeight(event) {
    this.setState({ webViewHeight: parseInt(event.jsEvaluationValue) })
  }

  render() {
    const getHTML = () => {
      var html = this.props.html
      const scaleOS =
        Platform.OS == 'ios' ? (width - 40) * scale * 1.5 : width - 70
      const fontBodyOS = Platform.OS == 'ios' ? '14pt' : '12pt'
      const fontpOS = Platform.OS == 'ios' ? '20pt' : '14pt'

      return (
        `<html><head><style type="text/css">
				      body {
				        margin: 8;
				        padding: 0;
				        font: ${fontBodyOS} arial, sans-serif;
				        background: white;
				        width: ` +
        scaleOS +
        `px;
				      }

				      a, h1, h2, h3, p, li {
				        font: ${fontpOS} arial, sans-serif !important;
				      }
				      img {
				        height: auto;
				        width: ` +
        scaleOS +
        `px;
			          }
				</style></head><body>` +
        html +
        '</body>'
      )
    }

    return (
      <WebView
        source={{ html: getHTML() }}
        injectedJavaScript="document.body.scrollHeight;"
        onNavigationStateChange={this.updateHeight.bind(this)}
        style={[
          {
            flex: 1,
            // width: width - 20,
            // height: 900
          },
          this.props.style,
        ]}
      />
    )
  }
}
