/** @format */

import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  DELETE_CART_ITEM,
  EMPTY_CART,
  CREATE_NEW_ORDER_PENDING,
  CREATE_NEW_ORDER_SUCCESS,
  CREATE_NEW_ORDER_ERROR,
  VALIDATE_CUSTOMER_INFO,
  INVALIDATE_CUSTOMER_INFO,
  FETCH_CART_PENDING,
  GET_SHIPPING_METHOD_PENDING,
  GET_SHIPPING_METHOD_SUCCESS,
  GET_SHIPPING_METHOD_FAIL,
  SELECTED_SHIPPING_METHOD,
  FETCH_MY_ORDER_SUCCESS,
  CLEAN_OLD_COUPON,
} from '@redux/types'
import { Languages, Validate } from '@common'
import { WooWorker } from 'api-ecommerce'

export const addCartItem = (product, variation, metaData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CART_ITEM,
      product,
      variation,
      metaData,
    })
  }
}

export const fetchMyOrder = (user) => {
  return (dispatch) => {
    dispatch({ type: FETCH_CART_PENDING })

    WooWorker.ordersByCustomerId(user.id, 40, 1)
      .then((data) => {
        dispatch({
          type: FETCH_MY_ORDER_SUCCESS,
          data,
        })
      })
      .catch((err) => {})
  }
}

export const removeCartItem = (product, variation) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      product,
      variation,
    })
  }
}

export const deleteCartItem = (product, variation, quantity) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CART_ITEM,
      product,
      variation,
      quantity,
    })
  }
}

export const emptyCart = () => {
  return (dispatch) => {
    dispatch({
      type: EMPTY_CART,
    })
  }
}

export const validateCustomerInfo = (customerInfo) => {
  return (dispatch) => {
    // console.log(customerInfo)
    const { first_name, last_name, address_1, email, phone } = customerInfo
    if (
      first_name.length == 0 ||
      last_name.length == 0 ||
      address_1.length == 0 ||
      email.length == 0 ||
      phone.length == 0
    ) {
      dispatch({
        type: INVALIDATE_CUSTOMER_INFO,
        message: Languages.RequireEnterAllFileds,
      })
    } else if (!Validate.isEmail(email)) {
      dispatch({
        type: INVALIDATE_CUSTOMER_INFO,
        message: Languages.InvalidEmail,
      })
    } else {
      dispatch({
        type: VALIDATE_CUSTOMER_INFO,
        message: '',
        customerInfo,
      })
    }
  }
}

export const createNewOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NEW_ORDER_PENDING })
    const json = await WooWorker.createOrder(payload)

    // console.log('json', json);
    if (json.hasOwnProperty('id')) {
      // dispatch({type: EMPTY_CART});
      dispatch({ type: CREATE_NEW_ORDER_SUCCESS, orderId: json.id })
    } else {
      dispatch({
        type: CREATE_NEW_ORDER_ERROR,
        message: Languages.CreateOrderError,
      })
    }
  }
}

export const getShippingMethod = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SHIPPING_METHOD_PENDING })
    const json = await WooWorker.getShippingMethod()

    if (json === undefined) {
      dispatch({
        type: GET_SHIPPING_METHOD_FAIL,
        message: Languages.ErrorMessageRequest,
      })
    } else if (json.code) {
      dispatch({ type: GET_SHIPPING_METHOD_FAIL, message: json.message })
    } else {
      dispatch({ type: GET_SHIPPING_METHOD_SUCCESS, shippings: json })
    }
  }
}

export const selectShippingMethod = (shippingMethod) => {
  return (dispatch) => {
    dispatch({ type: SELECTED_SHIPPING_METHOD, shippingMethod })
  }
}

export const finishOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NEW_ORDER_SUCCESS })
  }
}

export const cleanOldCoupon = () => {
  return async (dispatch) => dispatch({ type: CLEAN_OLD_COUPON })
}
