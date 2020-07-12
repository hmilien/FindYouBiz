/**
 * Created by InspireUI on 22/02/2017.
 *
 * @format
 */

import WooCommerceAPI from './WooCommerceAPI'
import { AppConfig, warn, error } from '@common'

const API = new WooCommerceAPI({
  url: AppConfig.Website.url,
  consumerKey: AppConfig.Website.consumerKey,
  consumerSecret: AppConfig.Website.consumerSecret,
  wp_api: true,
  version: 'wc/v2',
  queryStringAuth: true,
})

const WooWorker = {
  createNewOrder: (data, callback) => {
    API.post('orders', data)
      .then((response) => response.json())
      .then((json) => {
        if (json.code === undefined) callback(json)
      })
      .catch((error) => warn(error))
  },
  getCustomerById: async (id) => {
    try {
      const response = await API.get(`customers/${id}`)
      return response.json()
    } catch (err) {}
  },
  setBookingID: (orderId, bookID, callback) => {
    API.post('orders/' + orderId, { 'Booking ID': bookID })
      .then((json) => {
        if (json.code === undefined) callback(json)
      })
      .catch((error) => {})
  },

  getProductId: async (productId) => {
    try {
      const response = await API.get('products/' + productId)
      return await response.json()
    } catch (err) {
      error(err)
    }
  },

  ordersByCustomerId: async (id, per_page, page) => {
    try {
      let data = {
        customer: id,
        per_page,
        page,
      }
      const response = await API.get('orders', data)
      return response.json()
    } catch (err) {}
  },
}
export default WooWorker
