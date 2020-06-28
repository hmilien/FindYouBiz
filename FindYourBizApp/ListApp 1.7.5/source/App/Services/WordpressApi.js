/** @format */

import { Platform } from 'react-native'
import { Constants } from '@common'
// import console = require('console');
// import console = require('console');
/**
 * init class API
 * @param opt
 * @returns {WordpressAPI}
 * @constructor
 */
function WordpressAPI(opt) {
  if (!(this instanceof WordpressAPI)) {
    return new WordpressAPI(opt)
  }
  opt = opt || {}
  this.classVersion = '1.0.0'
  this._setDefaultsOptions(opt)
}

/**
 * Default option
 * @param opt
 * @private
 */
WordpressAPI.prototype._setDefaultsOptions = async function(opt) {
  this.url = opt.url
  this.logo = opt.logo
  this.tags = null
  this.categories = null

  //console.log('init api');

  // this.getTags();
  // this.getCategories();
}

/**
 * Get tags
 * @returns {axios.Promise}
 */
WordpressAPI.prototype.getTags = function() {
  var tagMapping = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#607D8B',
  ]
  var self = this
  var requestUrl = this.url + '/wp-json/wp/v2/tags?per_page=40'

  if (this.tags !== null) {
    return this.tags
  }

  return this._request(requestUrl).then(function(data) {
    if (data.length > 0) {
      var tagsList = []
      data.map((tag) => {
        tagsList[tag.id] = {
          text: tag.name,
          color: tagMapping[tag.id % 14],
        }
      })
      self.tags = tagsList
      return tagsList
    }
  })
}

/**
 * Get list of categories
 */
WordpressAPI.prototype.getCategories = function(data) {
  var requestUrl = ''
  if (data) {
    requestUrl = this.join(data, '&')
  } else {
    requestUrl = 'parent=0'
  }

  var requestUrl = this.url + '/wp-json/wp/v2/categories?' + requestUrl
  

  // console.log('category url: ', requestUrl);

  if (this.categories !== null) {
    return this.categories
  }
  return this._request(requestUrl).then(function(data) {
    this.categories = data
    return data
  })
}

/**
 * Request to the server,
 * You fixed: https://gist.github.com/pranavrajs/66bccee3f8ba100742a1273db6f587af
 * @param url
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
WordpressAPI.prototype._request = function(url, callback) {
  return fetch(url)
    .then((response) => response.text()) // Convert to text instead of res.json()
    .then((text) => {
      if (Platform.OS === 'android') {
        text = text.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '') // If android , I've removed unwanted chars.
      }
      return text
    })
    .then((response) => JSON.parse(response))

    .catch((error, data) => {
      // console.log('1=error network -', error, data);
    })
    .then((responseData) => {
      if (typeof callback == 'function') {
        callback()
      }
      // console.log('request result from ' + url, responseData);

      return responseData
    })
    .catch((error) => {
      // console.log('2=error network -- ', error.message);
    })
}
/**
 * Post to the server
 * @param url
 * @param data
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
WordpressAPI.prototype._requestPost = function(url, data, callback) {
  var self = this

  var params = {
    method: 'POST',
    // headers: {
    //   'Accept':       'application/json',
    //   'Content-Type': 'application/json',
    //   // 'X-CSRFToken':  cookie.load('csrftoken')
    //
    // },
    // credentials: 'same-origin',
    // mode: 'same-origin',
    body: JSON.stringify(data),
  }
  return fetch(url, params)
    .then((response) => response.json())

    .catch((error, data) => {
      // console.log('error network', error);
    })
    .then((responseData) => {
      if (typeof callback == 'function') {
        callback()
      }
      return responseData
    })
    .catch((error) => {
      // console.log('error network', error.message);
    })
}

/**
 * Get default logo from Wordpress
 * @returns {logo|{height, width, marginLeft}|{marginBottom, marginTop, height, width, alignSelf}|boolean|{width, height, resizeMode, marginTop, marginBottom, marginLeft}|{resizeMode, height, marginTop, marginRight, marginBottom, marginLeft}|*}
 */
WordpressAPI.prototype.getLogo = function() {
  return this.logo
}

WordpressAPI.prototype.join = function(obj, separator) {
  var arr = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(key + '=' + obj[key])
    }
  }
  return arr.join(separator)
}

/**
 * Get posts listing
 * @param data
 * @param callback
 * @returns {axios.Promise}
 */
WordpressAPI.prototype.getStickyPost = function() {
  var requestUrl = this.url + '/wp-json/wp/v2/posts/?_embed&sticky=true'
  // console.log('get sticky Posts', requestUrl);
  return this._request(requestUrl)
}

/**
 * Get posts listing
 * @param data
 * @param callback
 * @returns {axios.Promise}
 */
WordpressAPI.prototype.getPosts = function(data, callback, noEmbed) {
  var embedText = '_embed'
  if (typeof noEmbed !== 'undefined') {
    embedText = ''
  }

  var requestUrl = this.url + '/wp-json/wp/v2/posts/?' + embedText
  if (data) {
    requestUrl += '&' + this.join(data, '&')
  } else {
    data = { per_page: 10, page: 1, sticky: false }
    requestUrl += '&' + this.join(data, '&')
  }

  return this._request(requestUrl, callback)
}

WordpressAPI.prototype.getPages = function(data, callback) {
  var requestUrl = this.url + '/wp-json/wp/v2/pages/' + data.id
  if (data) {
    // requestUrl += '&' + this.join(data, '&');
  }
  // console.log('get Pages', requestUrl);
  return this._request(requestUrl, callback)
}

WordpressAPI.prototype.createComment = async function(data, callback) {
  let requestUrl = this.url + '/api/mstore_user/post_comment/?insecure=cool'
  if (data) {
    requestUrl += '&' + this.join(data, '&')
  }
  // console.log(requestUrl)
  return this._request(requestUrl, data, callback)
}

WordpressAPI.prototype.getNonceCreatePost = function() {
  let requestUrl = `${
    this.url
  }/api/get_nonce/?controller=posts&method=create_post`
  // console.warn(['requestUrl', requestUrl])
  return this._request(requestUrl).then(function(data) {
    return data
  })
}

WordpressAPI.prototype.getNonceRegister = function() {
  let requestUrl =
    this.url + '/api/get_nonce/?controller=mstore_user&method=register'

  // console.log('get nonce', requestUrl);
  return this._request(requestUrl).then(function(data) {
    return data.json
  })
}

WordpressAPI.prototype.getNonce = function() {
  const requestUrl =
    this.url +
    '/api/get_nonce/?controller=mstore_user&method=generate_auth_cookie'

  return this._request(requestUrl).then(function(data) {
    return data
  })
}

WordpressAPI.prototype.request = function(requestUrl) {
  return this._request(requestUrl).then(function(data) {
    return data
  })
}

WordpressAPI.prototype.generateAuthCookie = async function($email, $password) {
  const data = await this.getNonce()
  if (typeof data.status != 'undefined' && data.status == 'ok') {
    const nonce = data.nonce
    const requestUrl =
      this.url +
      '/api/mstore_user/generate_auth_cookie/?insecure=cool&nonce=' +
      nonce +
      '&username=' +
      $email +
      '&password=' +
      $password

    // console.log('user login', requestUrl);

    return this._request(requestUrl)
  }
}

WordpressAPI.prototype.register = async function($email, $password, $name) {
  const data = await this.getNonceRegister()

  if (typeof data.status !== 'undefined' && data.status === 'ok') {
    const nonce = data.nonce

    const requestUrl =
      this.url +
      '/api/mstore_user/register/?insecure=cool&nonce=' +
      nonce +
      '&email=' +
      $email +
      '&username=' +
      $email +
      '&display_name=' +
      $name +
      '&user_nicename=' +
      $name +
      '&first_name=' +
      $name +
      '&user_pass=' +
      $password

    // console.log('user register', requestUrl);

    return this._request(requestUrl)
  }
}

WordpressAPI.prototype.createPost = async function(
  user,
  book = null,
  data = null,
  orderId = 0
) {
  const response = await this.getNonceCreatePost()
  const cookieName = await this.generateAuthCookie(user.email, user.password)
  if (typeof response.status != 'undefined' && response.status == 'ok') {
    const nonce = response.nonce
    // console.warn([user, book, data, orderId])

    var title = 'Untitled'
    var meta_input = {}
    var type = 'wc_booking'
    var status = Constants.NewListing.status
    var username = user.username ? user.username : user.email

    if (data != null) {
      // for creating post
      title = data.title && data.title
      meta_input = data.meta_input
      type = data.type
    } else {
      // for booking
      meta_input = {
        _booking_product_id: book.productId,
        _booking_persons: book.persons,
        _booking_customer_id: user.id,
        _booking_start: book.date_start[0].value,
        _booking_end: book.date_end[0].value,
      }
      status = 'unpaid'
    }
    let requestUrl = `${
      this.url
    }/api/posts/create_post/?insecure=cool&nonce=${nonce}&title=${title}&email=${
      user.email
    }&username=${username}&password=${user.password}&author=${
      user.email
    }&status=${status}&parent=${orderId}&type=${type}&meta_input=${JSON.stringify(
      meta_input
    )}&platform=${Platform.OS}&cookie=${cookieName.cookie_name}`

    if (data.categories) {
      requestUrl += '&categories=' + data.categories
    }
    if (data.cate_type) {
      requestUrl += '&cate_type=' + data.cate_type
    }

    // console.warn(['requestUrl', requestUrl])
    return this._request(requestUrl)
  }
}

WordpressAPI.prototype.getJWTToken = function(username, password) {
  var requestUrl = this.url + '/wp-json/jwt-auth/v1/token'
  var options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }
  return fetch(requestUrl, options).then((response) => response.json())
}

WordpressAPI.prototype.getUserInfoByToken = function(token) {
  var requestUrl = this.url + '/wp-json/wp/v2/users/me'
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }
  return fetch(requestUrl, options).then((response) => response.json())
}

export default WordpressAPI
