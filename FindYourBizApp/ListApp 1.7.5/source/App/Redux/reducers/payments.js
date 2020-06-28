import {
    PAYMENT_FETCH_SUCCESS,
    PAYMENT_FETCH_FAILURE,
    PAYMENT_FETCHING
  } from "@redux/types";
  
  const initialState = {
    list: [],
    isFetching: false
  };
  
  export default (state = initialState, action) => {
    const { extra, type, payload, finish } = action;
  
    switch (type) {
      case PAYMENT_FETCH_SUCCESS:
        return {
          ...state,
          list: payload.filter(payment => payment.enabled === true),
          isFetching: false
        };
  
      case PAYMENT_FETCH_FAILURE:
        return {
          ...state,
          finish: true,
          isFetching: false
        };
  
      case PAYMENT_FETCHING:
        return {
          ...state,
          isFetching: true
        };
  
      default:
        return state;
    }
  };
  