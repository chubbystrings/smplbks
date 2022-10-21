import axios from "axios";
import { BASE_URL } from "../api/base_url";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
