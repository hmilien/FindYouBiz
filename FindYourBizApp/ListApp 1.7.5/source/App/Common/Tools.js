/** @format */

'use strict'

import { AsyncStorage, PixelRatio } from 'react-native'
import URI from 'urijs'
import sanitizeHtml from 'sanitize-html'
import { AllHtmlEntities } from 'html-entities'
import truncate from 'lodash/truncate'
import _ from 'lodash'
import _currencyFormatter from 'currency-formatter'

import Images from './Images'
import Constants from './Constants'
import Config from './Config'

export default class Tools {
  /**
   * refresh the tab bar & read later page
   */
  static refresh() {
    // Events.loginRefresh();
    // Events.homePageRefresh();
    Events.sideMenuRefresh()
  }

  /**
   * Get data image size base on the width
   */
  static getImageSize(data, widthScreen) {
    var size = { width: widthScreen, height: 0 }

    if (typeof data.better_featured_image !== 'undefined') {
      const { width, height } = data.better_featured_image['media_details'][
        'sizes'
      ]['medium']
      size.height = (widthScreen * height) / width
    }
    return size
  }

  // get Image
  static getImage(data, imageSize = 'medium', useCoverImage = false) {
    let imageURL = '';
    if (typeof data === 'undefined' || data === null) {
      return ''
    }
    if (typeof imageSize === 'undefined') {
      imageSize = 'medium'
    }

    const getImageSize = (mediaDetail) => {
      let url = ''
      if (typeof mediaDetail['sizes'] !== 'undefined') {
        if (typeof mediaDetail['sizes'][imageSize] != 'undefined') {
          url = mediaDetail['sizes'][imageSize]['source_url']
            ? mediaDetail['sizes'][imageSize]['source_url']
            : mediaDetail['sizes'][imageSize]['file']

          if (typeof url === 'undefined') {
            url = mediaDetail['sizes'][imageSize]['url']
          }
        }
      }
      return url
    }

    // using cover image is default
    if (
      useCoverImage &&
      typeof data.listing_data !== 'undefined' &&
      typeof data.listing_data._job_cover !== 'undefined' &&
      data.listing_data._job_cover !== '' 
    ) {
      imageURL = this.getProductImage(data.listing_data._job_cover[0]);
    }

    if(imageURL === undefined) {
      if (
        typeof data.better_featured_image !== 'undefined' &&
        data.better_featured_image !== null &&
        typeof data.better_featured_image['media_details'] !== 'undefined'
      ) {
        imageURL = getImageSize(data.better_featured_image['media_details']["sizes"][imageSize]["source_url"]);
      }
    }

    if (imageURL === '') {
      // switch to using featured_image
      if (
        typeof data.better_featured_image !== 'undefined' &&
        data.better_featured_image !== null &&
        typeof data.better_featured_image['media_details'] !== 'undefined'
      ) {
        imageURL = getImageSize(data.better_featured_image['media_details'])
      }
    } 

    return imageURL === '' || imageURL === undefined ? Images.imageBase : imageURL
  }

  static getYoutubeLink = (content) => {
    const regExp = /^.*((www.youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#&\?\/\ ]*).*/
    var embedId = ''
    var youtubeUrl = ''

    try {
      URI.withinString(content, function(url) {
        var match = url.match(regExp)
        if (match && match[7].length === 11) {
          embedId = match[7]
          youtubeUrl = 'https://www.youtube.com/embed/' + embedId
        }
      })
    } catch (e) {}
    return youtubeUrl
  }

  // https://www.facebook.com/facebook/videos/10153231379946729/
  static getFacebookLink = (content) => {
    const regExp = /^.*((www.facebook.com\/facebook\/)|(v\/)|(\/u\/\w\/)|(videos\/))([^#&\?\/\ ]*).*/
    var embedId = ''
    var facebookURL = ''

    try {
      URI.withinString(content, function(url) {
        var match = url.match(regExp)
        if (match && match[6].length === 17) {
          embedId = match[6]
          facebookURL =
            'https://www.facebook.com/video/embed?video_id=' + embedId
        }
      })
    } catch (e) {}
    return facebookURL
  }

  // https://player.vimeo.com/video/192142314
  static getVimeoLink = (content) => {
    const regExp = /^.*((player.vimeo.com)|(v\/)|(\/u\/\w\/)|(video\/))([^#&\?\/\ ]*).*/
    var embedId = ''
    var vimeoURL = ''

    try {
      URI.withinString(content, function(url) {
        var match = url.match(regExp)
        if (match && match[6].length === 9) {
          embedId = match[6]
          vimeoURL = 'https://player.vimeo.com/video/' + embedId
        }
      })
    } catch (e) {}
    return vimeoURL
  }

  static getLinkVideo(content) {
    const youtubeURL = Tools.getYoutubeLink(content)
    const videoURL = Tools.getFacebookLink(content)
    const getVimeoLink = Tools.getVimeoLink(content)
    return youtubeURL | videoURL | getVimeoLink
  }

  static async getFontSizePostDetail() {
    const data = await AsyncStorage.getItem('@setting_fontSize')
    if (typeof data !== 'undefined') {
      return parseInt(data)
    }
    return Constants.fontText.size
  }

  static getDescription(desc, limit) {
    if (typeof limit === 'undefined') {
      limit = 50
    }
    // desc.replace('<p>', '');
    let htmlContent = sanitizeHtml(desc, {
      allowedTags: ['span', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
      allowedAttributes: {
        a: ['href'],
        img: ['src'],
      },
    })
    htmlContent = truncate(htmlContent, { length: limit, separator: ' ' })

    return AllHtmlEntities.decode(htmlContent)
  }

  static formatText(desc, limit) {
    if (typeof limit === 'undefined') {
      limit = 50
    }

    if (typeof desc === 'undefined') {
      return ''
    }

    var desc = desc.replace('<p>', '').replace('</p>', '')
    desc = truncate(desc, { length: limit, separator: ' ' })

    return AllHtmlEntities.decode(desc)
  }

  static viewCateDetail(categoryId) {
    Events.homePageSetActiveCate(categoryId)
  }

  static geoAddress(position) {
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        position.latitude
      },${position.longitude}`
    )
      .then((response) => response.json())
      .catch((err) => console.warn(['err', err]))
      .then((responseJson) => {
        return responseJson
      })
      .catch((err) => console.warn(['err', err]))
  }

  static async getNotification() {
    try {
      const notification = await AsyncStorage.getItem('@notification')
      return JSON.parse(notification)
    } catch (error) {
      // console.log(error)
    }
  }

  static getAvatar(userData) {
    if (userData) {
      if (userData.picture) {
        return userData.picture.data.url
      } else {
        return userData.avatar_url
      }
    }

    return Images.person
  }

  static getName(userData) {
    if (userData) {
      if (userData.displayName) {
        return userData.displayName
      } else {
        return userData.email
      }
    }

    return ''
  }

  static getAuthorName(post) {
    if (
      post._embedded != undefined &&
      post._embedded.author != undefined &&
      post._embedded.author.length > 0
    ) {
      let author = post._embedded.author[0]
      return author.name
    }
    return ''
  }

  static getAuthorAvatar(post, size = 48) {
    if (
      post._embedded != undefined &&
      post._embedded.author != undefined &&
      post._embedded.author.length > 0
    ) {
      let author = post._embedded.author[0]
      if (author.avatar_urls[`${size}`] != undefined) {
        return author.avatar_urls[`${size}`]
      } else {
        author.avatar_urls['48']
      }
    }
    return ''
  }

  static getProductImage = (uri, containerWidth) => {
    // Enhance number if you want to fetch a better quality image (may affect performance
    const DPI_NUMBER = 1 // change this to 1 for high quality image

    if (!Config.ProductSize.enable) {
      return uri
    }

    if (typeof uri !== 'string') {
      return Images.PlaceHolderURL
    }

    // parse uri into parts
    const index = uri.lastIndexOf('.')
    let editedURI = uri.slice(0, index)
    let defaultType = uri.slice(index)

    // fix bug: the generate does not work on jpeg
    if (defaultType == '.jpeg') {
      defaultType = '.jpg'
    }

    const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(containerWidth)

    switch (true) {
      case pixelWidth * DPI_NUMBER < 300:
        editedURI = `${editedURI}-small${defaultType}`
        break
      case pixelWidth * DPI_NUMBER < 600:
        editedURI = `${editedURI}-medium${defaultType}`
        break
      case pixelWidth * DPI_NUMBER < 1400:
        editedURI = `${editedURI}-large${defaultType}`
        break
      default:
        editedURI += defaultType
    }

    return editedURI
  }

  static currencyFormatter = _.bind(_currencyFormatter.format, undefined, _, {
    symbol: '$',
    decimal: '.',
    thousand: ',',
    precision: 2,
    format: '%s%v', // %s is the symbol and %v is the value
  })

  static getCategory = (categories) => {
    let result = ''
    if (categories && categories.length > 0) {
      result = categories[0].name
    }
    return result
  }
}
