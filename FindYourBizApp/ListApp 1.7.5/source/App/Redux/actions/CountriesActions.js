import {
    COUNTRY_FETCHING,
    COUNTRY_FETCH_SUCCESS,
    COUNTRY_FETCH_FAILURE
  } from "@redux/types";
  import CountryWorker from "@services/CountryWorker";
  
  export const fetchAllCountries = () => {
    return async dispatch => {
      dispatch({ type: COUNTRY_FETCHING });
  
      const json = await CountryWorker.getAllCountries();
      
      if (json === undefined) {
        dispatch({ type: COUNTRY_FETCH_FAILURE });
      } else if (json.code) {
        dispatch({ type: COUNTRY_FETCH_FAILURE });
      } else {
        dispatch({
          type: COUNTRY_FETCH_SUCCESS,
          payload: json,
          finish: true
        });
      }
    };
  };
  