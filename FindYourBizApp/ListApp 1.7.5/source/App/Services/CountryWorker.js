/** @format */

const API_COUNTRY = "https://restcountries.eu/rest/v1/all";

const CountryWorker = {
  getAllCountries: async () => {
    try {
      const data = {};
      const response = await fetch(API_COUNTRY);
      const result = await response.json();
  
      if (result.length !== 0) {
        for (const country of result) {
          data[`${country.alpha2Code}`] = country.name;
        }
      }
  
      return data; 
    } catch (error) {}
  }
};

export default CountryWorker;
