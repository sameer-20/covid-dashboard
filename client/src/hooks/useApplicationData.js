import { useEffect, useReducer } from "react";
import axios from "axios";
import dataReducer, {
  SET_USERS,
  SET_HISTORICAL_GLOBAL,
  SET_YESTERDAY_CONTINENTS,
  SET_YESTERDAY_GLOBAL,
  SET_WORLD_COVID_NEWS,
} from "../reducers/dataReducer";

// const API_KEY = process.env.NEWS_API_KEY;
// const NEWS_URL = `http://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&lang=en&q=covid&sortby=publishedAt`;
// console.log("NEWS_URL is @@@@@@@", NEWS_URL);

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    globalHistorical: {},
    yesterdayContinents: [],
    yesterdayGlobal: {},
    worldCovidNews: {},
    loading: true,
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/users",
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_USERS, users: data });
    });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://disease.sh/v3/covid-19/historical/all?lastdays=20",
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_HISTORICAL_GLOBAL, globalHistorical: data });
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: " https://disease.sh/v3/covid-19/continents",
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_YESTERDAY_CONTINENTS, yesterdayContinents: data });
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: " https://disease.sh/v3/covid-19/all",
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_YESTERDAY_GLOBAL, yesterdayGlobal: data });
      // console.log(data);
    });
  }, []);

  useEffect(() => {
    // ****** Place API key in the environment variables ****
    axios({
      method: "GET",
      url:
        // NEWS_URL,
        "http://newsapi.org/v2/top-headlines?apiKey=93894a50640e4b77a88f4d1b8c720c4d&lang=en&q=covid&sortby=publishedAt",
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_WORLD_COVID_NEWS, worldCovidNews: data });
      // console.log(
      //  "useApplicationData.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      // console.log(data);
    });
  }, []);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
