import {
    PAYMENT_FETCH_SUCCESS,
    PAYMENT_FETCH_FAILURE,
    PAYMENT_FETCHING
  } from "@redux/types";
  
  import { WooWorker } from "api-ecommerce";

  
  export const fetchPayments = () => {
    return async dispatch => {
      dispatch({ type: PAYMENT_FETCHING });
  
      const json = await WooWorker.getPayments();
      if (json === undefined) {
        dispatch({ type: PAYMENT_FETCH_FAILURE });
      } else if (json.code) {
        dispatch({ type: PAYMENT_FETCH_FAILURE });
      } else {
        dispatch({
          type: PAYMENT_FETCH_SUCCESS,
          payload: json,
          finish: true
        });
      }
    };
  };
  