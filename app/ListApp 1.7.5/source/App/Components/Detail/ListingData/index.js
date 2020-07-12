/** @format */

import React, { PureComponent } from 'react'
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import { Color, Languages, Tools } from '@common'
import { MapView, WebView, AdMob, AdFacebook, RelatedPost } from '@components'
import { WebBrowser } from '@expo'
import Icon from '@expo/vector-icons/MaterialIcons'
import sanitizeHtml from 'sanitize-html'
import styles from './styles'

export default class ListingData extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderDescription = (section, pos) => {
    // console.warn(this.props.post)
    const content = sanitizeHtml(this.props.post.content, {
      allowedTags: ['img', 'a'],
      allowedAttributes: { a: ['href'], img: ['src'] },
    })
    if (content !== '' && typeof content !== 'undefined') {
      return (
        <View style={styles.section} key={pos}>
          <View style={styles.lineTitle}>
            <Image source={section.icon} style={styles.iconRow} />
            <Text style={styles.title}>{section.section}</Text>
          </View>
          <WebView html={content} style={styles.content} />
        </View>
      )
    }
    return <View />
  }

  _renderDataType = (section, pos) => {
    const { post } = this.props
    let hasKey = false
    if (typeof post.listing_data !== 'undefined') {
      Object.keys(post.listing_data).forEach((k) => {
        section.data.map((item) => {
          if (item.key === k) {
            hasKey = true
          }
        })
      })

      return (
        <View
          style={[styles.section, !hasKey && { paddingVertical: 0 }]}
          key={pos}>
          {hasKey && (
            <View style={styles.lineTitle}>
              <Image source={section.icon} style={styles.iconRow} />
              <Text style={styles.title}>{section.section}</Text>
            </View>
          )}

          {section.data.map((item, index) => {
            if (
              typeof post.listing_data[item.key] !== 'undefined' &&
              post.listing_data[item.key] !== ''
            ) {
              let unit = typeof item.unit !== 'undefined' ? item.unit : ''
              return (
                <TouchableOpacity style={styles.row} key={index}>
                  {/*<Image style={styles.imageIcon} source={item.icon} />*/}
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <Text style={styles.label}>{item.name}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={styles.text}>
                      {post.listing_data[item.key] + ' ' + unit}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </View>
      )
    }
    return <View />
  }

  _renderItem = (section, pos) => {
    const { post } = this.props
    let list = []

    switch (section.type) {
      case 'category':
        list = post.job_listing_categories
        break
      case 'tag':
        list =
          typeof post.pure_taxonomies.case27_job_listing_tags !== 'undefined'
            ? post.pure_taxonomies.case27_job_listing_tags
            : []
        break
      case 'region':
        list = post.pure_taxonomies.region
        break
      case 'type':
        list = post.pure_taxonomies.job_listing_type
        break
      default:
        list = []
    }
    if (typeof list !== 'undefined' && list.length !== 0) {
      return (
        <View style={styles.section} key={pos}>
          {list.length != 0 && (
            <View style={[styles.lineTitle, styles.lineTitleCates]}>
              <Image source={section.icon} style={styles.iconRow} />
              <Text style={styles.title}>{section.section}</Text>
            </View>
          )}
          <View style={styles.boxItems}>
            {list.map((item, index) => {
              return (
                <View style={styles.item} key={'item-' + index}>
                  <Icon
                    name={'check'}
                    color={Color.main}
                    size={18}
                    style={styles.iconFeature}
                  />
                  <Text style={styles.nameFeature}>
                    {Tools.formatText(item.name)}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      )
    }
    return null
  }

  openMap = () => {
    const { address_lat, address_long } = this.props.post
    // const url = `http://maps.apple.com/?ll=${address_lat},${address_long}`
    const urlGG = `https://google.com/maps/place/${address_lat},${address_long}`
    WebBrowser.openBrowserAsync(urlGG)
  }
  _renderMap = (section, pos) => {
    if (
      this.props.post.address_lat !== '' &&
      this.props.post.address_long !== ''
    ) {
      return (
        <View style={[styles.section, styles.sectionMap]} key={pos}>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.lineTitle, styles.lineTitleMap]}>
              <Image source={section.icon} style={styles.iconRow} />
              <Text style={styles.title}>{section.section}</Text>
            </View>
            <TouchableOpacity
              style={styles.lineMapRight}
              onPress={this.openMap}>
              <Text style={styles.textMap}>{Languages.viewMapFull}</Text>
            </TouchableOpacity>
          </View>
          <MapView
            key={pos}
            css={{ width: '100%' }}
            cssMap={{
              width: '100%',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
            post={this.props.post}
            isPostDetail
          />
        </View>
      )
    }
  }

  _renderRelated = (section, pos) => {
    return (
      <View style={styles.section} key={pos}>
        <View style={styles.lineTitle}>
          <Image source={section.icon} style={styles.iconRow} />
          <Text style={styles.title}>{section.section}</Text>
        </View>
        <View style={[styles.boxItems, styles.boxRelatedItems]}>
          <RelatedPost
            onViewPost={this.props.onViewPost}
            posts={this.props.relatedPosts}
          />
        </View>
      </View>
    )
  }

  _renderAdMob = (section, pos) => {
    return this.props.general.AdMob.visible ? (
      <View style={styles.section} key={pos}>
        <AdMob />
      </View>
    ) : null
  }

  _renderAdFacebook = (section, pos) => {
    const { general } = this.props
    return general.Facebook.visible ? (
      <View style={styles.section} key={pos}>
        <AdFacebook
          type={general.Facebook.sizeAds}
          placementId={general.Facebook.adPlacementID}
        />
      </View>
    ) : null
  }

  _renderStaticPage = (page, pos) => {
    return null
  }

  render() {
    const { data } = this.props
    return (
      <View style={styles.container}>
        {data &&
          data.map((section, pos) => {
            switch (section.type) {
              case 'description':
                return this._renderDescription(section, pos)
                break
              case 'data':
                return this._renderDataType(section, pos)
                break
              case 'category':
              case 'tag':
              case 'region':
              case 'type':
                return this._renderItem(section, pos)
                break
              case 'map':
                return this._renderMap(section, pos)
                break
              case 'related':
                return this._renderRelated(section, pos)
                break
              case 'admob':
                return this._renderAdMob(section, pos)
                break
              case 'adface':
                return this._renderAdFacebook(section, pos)
                break
              case 'contact':
                return this._renderStaticPage(section, pos)
                break
              default:
                return <View />
            }
          })}
      </View>
    )
  }
}
