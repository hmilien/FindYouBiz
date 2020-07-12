/** @format */

import React, { Component } from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils'
import { Tools, Constants } from '@common'
import styles from './style'
const { width: PAGE_WIDTH } = Dimensions.get('window')

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true, fontSize: Constants.fontText.size }
  }

  async componentWillMount() {
    const fontSize = await Tools.getFontSizePostDetail()

    this.setState({
      fontSize,
      isLoading: false,
    })
  }

  render() {
    const htmlContent = this.props.html
    // let htmlContent = striptags(this.props.html, ['img', 'a', 'p', 'span', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4']);
    // const htmlContent = sanitizeHtml(this.props.html, {
    //   allowedTags: ['img', 'a', 'p', 'span', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4'],
    //   allowedAttributes: {
    //     'a': ['href'],
    //     'img': ['src']
    //   }
    // });

    const fontSize = this.state.fontSize
      ? this.state.fontSize
      : Constants.fontText.size

    const tagsStyles = {
      a: { color: '#333', fontSize },
      p: {
        color: '#333',
        fontSize,
        paddingBottom: 20,
        width: PAGE_WIDTH - 40,
        textAlign: 'justify',
      },
      img: { resizeMode: 'cover' },
    }

    const renderers = {
      img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const { src, alt, width, height } = htmlAttribs
        if (!src) {
          return false
        }
        const newWidth = PAGE_WIDTH - 20

        const newHeight = (height * newWidth) / width
        return (
          <Image
            source={{ uri: src }}
            style={{
              width: newWidth,
              height: newHeight,
              marginTop: 10,
              marginBottom: 10,
              resizeMode: 'contain',
            }}
          />
        )
      },
      a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const { href } = htmlAttribs

        if (!href) {
          return false
        }
        return <Text>{href}</Text>
      },
    }

    if (this.state.isLoading) {
      return <View />
    }

    const { style } = this.props
    return (
      <HTML
        containerStyle={[style && style]}
        html={htmlContent}
        ignoredTags={[...IGNORED_TAGS, 'customTag']}
        renderers={renderers}
        baseFontStyle={styles.baseStyle}
        textSelectable
        tagsStyles={tagsStyles}
      />
    )
  }
}
