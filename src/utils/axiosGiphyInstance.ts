import axios from "axios";
import { GIPHY_BASE_URL } from "../constants/apis";

const axiosGiphyInstance = axios.create({ baseURL: GIPHY_BASE_URL });

axiosGiphyInstance.interceptors.request.use(config => {
  config.params = {
    api_key: process.env.GIPHY_API_KEY,
    limit: 9,
    ...config.params
  };

  return config;
});

export default axiosGiphyInstance;
