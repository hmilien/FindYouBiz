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
  FETCH_MY_ORDER,
  CLEAN_OLD_COUPON,
  FETCH_MY_ORDER_SUCCESS,
} from '@redux/types'
import { Constants } from '@common'

const initialState = {
  cartItems: [],
  total: 0,
  totalPrice: 0,
  myOrders: [],
  isFetching: false,
  shippingMethod: null,
}

export default (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case ADD_CART_ITEM: {
      const isExisted = state.cartItems.some((cartItem) =>
        compareCartItem(cartItem, action)
      )
      return Object.assign(
        {},
        state,
        isExisted
          ? { cartItems: state.cartItems.map((item) => cartItem(item, action)) }
          : { cartItems: [...state.cartItems, cartItem(undefined, action)] },
        {
          total: 1,
          totalPrice:
            // Number(state.totalPrice) +
            Number(
              action.variation === undefined ||
              action.variation == null ||
              action.variation.price === undefined
                ? action.product.price
                : action.variation.price
            ),
        }
      )
    }
    case REMOVE_CART_ITEM: {
      const index = state.cartItems.findIndex((cartItem) =>
        compareCartItem(cartItem, action)
      ) // check if existed
      return index == -1
        ? state // This should not happen, but catch anyway
        : Object.assign(
            {},
            state,
            state.cartItems[index].quantity == 1
              ? {
                  cartItems: state.cartItems.filter(
                    (cartItem) => !compareCartItem(cartItem, action)
                  ),
                }
              : {
                  cartItems: state.cartItems.map((item) =>
                    cartItem(item, action)
                  ),
                },
            {
              total: 0,
              totalPrice: 0,
              // state.totalPrice -
              // Number(
              //   action.variation === undefined ||
              //   action.variation == null ||
              //   action.variation.price === undefined
              //     ? action.product.price
              //     : action.variation.price
              // ),
            }
          )
    }
    case DELETE_CART_ITEM: {
      const index1 = state.cartItems.findIndex((cartItem) =>
        compareCartItem(cartItem, action)
      ) // check if existed
      return index1 == -1
        ? state // This should not happen, but catch anyway
        : Object.assign({}, state, {
            cartItems: state.cartItems.filter(
              (cartItem) => !compareCartItem(cartItem, action)
            ),
            total: state.total - Number(action.quantity),
            totalPrice:
              state.totalPrice -
              Number(action.quantity) *
                Number(
                  action.variation === undefined ||
                  action.variation == null ||
                  action.variation.price === undefined
                    ? action.product.price
                    : action.variation.price
                ),
          })
    }
    case EMPTY_CART:
      return Object.assign({}, state, {
        type: EMPTY_CART,
        cartItems: [],
        total: 0,
        totalPrice: 0,
      })
    case INVALIDATE_CUSTOMER_INFO:
      return Object.assign({}, state, {
        message: action.message,
        type: INVALIDATE_CUSTOMER_INFO,
      })
    case VALIDATE_CUSTOMER_INFO:
      return Object.assign({}, state, {
        message: null,
        type: VALIDATE_CUSTOMER_INFO,
        customerInfo: action.customerInfo,
      })
    case CREATE_NEW_ORDER_SUCCESS:
      return Object.assign({}, state, {
        type: CREATE_NEW_ORDER_SUCCESS,
        cartItems: [],
        total: 0,
        totalPrice: 0,
      })
    case CREATE_NEW_ORDER_ERROR:
      return Object.assign({}, state, {
        type: CREATE_NEW_ORDER_ERROR,
        message: action.message,
      })
    case FETCH_MY_ORDER:
      return Object.assign({}, state, {
        type: FETCH_MY_ORDER,
        isFetching: false,
        myOrders: action.data,
      })
    case FETCH_CART_PENDING: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case GET_SHIPPING_METHOD_PENDING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        error: null,
      })
    }
    case GET_SHIPPING_METHOD_FAIL: {
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      })
    }
    case GET_SHIPPING_METHOD_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        shippings: action.shippings,
        error: null,
      })
    }
    case SELECTED_SHIPPING_METHOD: {
      return Object.assign({}, state, {
        ...state,
        shippingMethod: action.shippingMethod,
      })
    }
    case CLEAN_OLD_COUPON: {
      return Object.assign({}, state, {
        coupon: {
          amount: 0,
          code: '',
        },
      })
    }
    case FETCH_MY_ORDER_SUCCESS: {
      return {
        ...state,
        myOrders: action.data,
        isFetching: false,
      }
    }
    default: {
      return state
    }
  }
}

const compareCartItem = (cartItem, action) => {
  if (
    cartItem.variation !== undefined &&
    action.variation !== undefined &&
    cartItem.variation != null &&
    action.variation != null
  )
    return (
      cartItem.product.id === action.product.id &&
      cartItem.variation.id === action.variation.id
    )
  return cartItem.product.id === action.product.id
}

const cartItem = (
  state = {
    product: undefined,
    quantity: 1,
    variation: undefined,
    metaData: undefined,
  },
  action
) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return state.product === undefined
        ? Object.assign({}, state, {
            product: action.product,
            variation: action.variation,
            metaData: action.metaData,
          })
        : !compareCartItem(state, action)
          ? state
          : Object.assign({}, state, {
              quantity:
                state.quantity < Constants.LimitAddToCart
                  ? state.quantity + 1
                  : state.quantity,
              metaData: action.metaData,
            })
    case REMOVE_CART_ITEM:
      return !compareCartItem(state, action)
        ? state
        : Object.assign({}, state, {
            // quantity: state.quantity - 1
            quantity: 0,
          })
    default:
      return state
  }
}
