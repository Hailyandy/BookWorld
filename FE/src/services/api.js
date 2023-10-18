import axios from "axios";
import { NotificationHandler } from "~/App";
export const axiosInstance = axios.create({
  baseURL: "https://localhost:7005/api/v1/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

axiosInstance.interceptors.request.use(config => {
  // Show loading overlay
  // loading.showLoading()

  return config
})

axiosInstance.interceptors.response.use(response => {
  // Hide loading overlay
  // loading.hideLoading()
  return response
})


export const getAPI = async (endpoint, param, config = {}) => {
  if (param) {
    endpoint = `${endpoint}/${param}`
  }
  try {
    const response = await axiosInstance.get(endpoint, config)
    // loading.hideLoading()
    if (response.status === 200) {
      // Lấy dữ liệu thành công
      return response.data
    } else if (response.status === 201) {
      // Post dữ liệu thành công
      // this.notification.displaySuccessNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_201)
      return response.data
    }
    // return this.handleAPISuccess(response)
  } catch (error) {
    this.handleAPIError(error)
    throw error
  }
}

export const postAPI = async (endpoint, config = {}) => {
  try {
    const response = await axiosInstance.post(endpoint, config)
    return this.handleAPISuccess(response)
  } catch (error) {
    this.handleAPIError(error)
    throw error
  }
}

export const putAPI = async (endpoint, config = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, config)
    return this.handleAPISuccess(response)
  } catch (error) {
    this.handleAPIError(error)
    throw error
  }
}

//Xóa 1 bản ghi
export const deleteAPI = async (endpoint, id) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`)
    return this.handleAPISuccess(response)
  } catch (error) {
    this.handleAPIError(error)
    throw error
  }
}
export const deleteManyAPI = async (endpoint, config) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}`, config)
    return this.handleAPISuccess(response)
  } catch (error) {
    this.handleAPIError(error)
    throw error
  }
}

const handleAPISuccess = (res) => {
  //notificationHandler('topLeft--position of noti', 'notification message')
  const notificationHandler = NotificationHandler.openNotification
  console.log(notificationHandler)
  // loading.hideLoading()
  if (res.status === 200) {
    // Lấy dữ liệu thành công
    // this.notification.displaySuccessNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_200)
    console.log(res.data)
    return res.data
  } else if (res.status === 201) {
    // Post dữ liệu thành công
    // this.notification.displaySuccessNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_201)
    return res.data
  }
}
const handleAPIError = (error) => {
  //notificationHandler('topLeft--position of noti', 'notification message')
  const notificationHandler = NotificationHandler.openNotification
  console.log(notificationHandler)
  // loading.hideLoading()
  // Handle error
  if (error.response) {
    // Lỗi từ API
    this.handleServerError(error.response)
  } else {
    // Lỗi mạng, request không gửi được
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.network_error)

  }
}
const handleServerError = (error) => {
  // loading.hideLoading()
  if (error.status === 400) {

    // Lỗi từ client – dữ liệu đầu vào không hợp lệ.
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_400)
  } else if (error.status === 401) {

    //Lỗi từ client - hông tin xác thực không hợp lệ
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_401)
  } else if (error.status === 403) {

    //Không tin xác thực không hợp lệ
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_403)
  }
  else if (error.status === 404) {

    //Không tìm thấy địa chỉ hoặc tài nguyên
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_404)
  }
  else if (error.status === 500) {

    //Lỗi từ back-end.
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.code_500)
  } else {

    //Có lỗi từ máy chủ!'
    // this.notification.displayErrNoti($MISAcommon.MISAresource.notification_content.error_status_code.server_error)
  }
}
