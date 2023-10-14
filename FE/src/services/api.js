import axios from "axios";
import useLoading from "./loading";
const loading = useLoading()
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7005/api/v1/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use(config => {
  // Show loading overlay
  loading.showLoading()

  return config
})

axiosInstance.interceptors.response.use(response => {
  // Hide loading overlay
  loading.hideLoading()
  return response
})
