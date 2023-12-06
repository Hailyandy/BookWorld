import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import BSHAREresource from "~/helper/BSHAREresource";
import tokenService from "./token.service";
import { showSpinner, hideSpinner } from "~/helper/notifyDisplay";
import { objectToParams } from "~/helper/format";
const notyf = new Notyf({
  duration: 2000,
  position: {
    x: 'right',
    y: 'bottom',
  },
});
console.log(tokenService.getLocalAccessToken())
export let axiosInstance = axios.create({
  baseURL: `${BSHAREresource.url.baseUrlBE}`,
  headers: { 'Authorization': `${tokenService.getLocalAccessToken()}`, 'Access-Control-Allow-Origin': '*', 'Accept': '*/*', 'Content-Type': 'application/json' }

});

axiosInstance.interceptors.request.use(config => {
  // Show loading overlay
  showSpinner()
  return config
})

axiosInstance.interceptors.response.use(response => {
  // Hide loading overlay
  hideSpinner()
  return response
})


export const getAPI = async (endpoint, param, config = {}) => {
  console.log(config)
  if (param) {
    endpoint = `${endpoint}?${objectToParams(param)}`
  }
  try {
    axiosInstance = axios.create({
      baseURL: `${BSHAREresource.url.baseUrlBE}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${tokenService.getLocalAccessToken()}`,
        "Access-Control-Allow-Origin": "http://localhost:3000/"
      },

    });
    console.log(config)
    const response = await axiosInstance.get(endpoint, config)
    // loading.hideLoading()
    if (response.status === 200) {
      // Lấy dữ liệu thành công
      return response.data
    } else if (response.status === 201) {
      // Post dữ liệu thành công
      // notyf.success('Đẩy dữ liệu lên server thành công')
      return response.data
    }
    // return handleAPISuccess(response)
  } catch (error) {
    const handleAPIErrordata = handleAPIError(error)
    return handleAPIErrordata
  }
}

export const postAPI = async (endpoint, config = {}) => {
  try {
    axiosInstance = axios.create({
      baseURL: `${BSHAREresource.url.baseUrlBE}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${tokenService.getLocalAccessToken()}`,
        "Access-Control-Allow-Origin": "*"
      },

    });
    const response = await axiosInstance.post(endpoint, config)

    return handleAPISuccess(response)
  } catch (error) {
    handleAPIError(error)
    throw error
  }
}



export const patchAPI = async (endpoint, config = {}) => {
  try {
    axiosInstance = axios.create({
      baseURL: `${BSHAREresource.url.baseUrlBE}`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${tokenService.getLocalAccessToken()}`,
        "Access-Control-Allow-Origin": "*"
      },

    });
    const response = await axiosInstance.patch(endpoint, config)

    return handleAPISuccess(response)
  } catch (error) {
    handleAPIError(error)
    throw error
  }
}

export const putAPI = async (endpoint, config = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, config)
    return handleAPISuccess(response)
  } catch (error) {
    handleAPIError(error)
    throw error
  }
}

//Xóa 1 bản ghi
export const deleteAPI = async (endpoint, id) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}`, { data: id })
    return handleAPISuccess(response)
  } catch (error) {
    handleAPIError(error)
    throw error
  }
}
export const deleteManyAPI = async (endpoint, config) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}`, config)
    return handleAPISuccess(response)
  } catch (error) {
    return handleAPIError(error)

  }
}

const handleAPISuccess = (res) => {

  if (res.status === 200) {
    // Lấy dữ liệu thành công
    notyf.success(res.data.message)
    console.log(res.data)
    return res.data
  } else if (res.status === 201) {
    // Post dữ liệu thành công
    notyf.success(res.data.message)
    return res.data
  }
}
const handleAPIError = (error) => {
  // loading.hideLoading()
  // Handle error
  if (error.response) {
    // Lỗi từ API
    var handleErrorCodedata = handleServerError(error.response)
    return handleErrorCodedata
  } else {
    // Lỗi mạng, request không gửi được
    notyf.error(BSHAREresource.notification_content.error_status_code.network_error)

  }
}
const handleServerError = (error) => {
  // loading.hideLoading()
  if (error.status === 400) {

    // Lỗi từ client – dữ liệu đầu vào không hợp lệ.
    // notyf.error(BSHAREresource.notification_content.error_status_code.code_400)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.code_400}<br />` + `${error.data.message}`)
  } else if (error.status === 401) {

    //Lỗi từ client - hông tin xác thực không hợp lệ
    // notyf.error(BSHAREresource.notification_content.error_status_code.code_401)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.code_401}<br />` + `${error.data.message}`)
  } else if (error.status === 403) {

    //Không tin xác thực không hợp lệ
    // notyf.error(BSHAREresource.notification_content.error_status_code.code_403)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.code_403}<br />` + `${error.data.message}`)
  }
  else if (error.status === 404) {
    console.log('file api.js loi 404')
    console.log(error)
    //Không tìm thấy địa chỉ hoặc tài nguyên
    // notyf.error(BSHAREresource.notification_content.error_status_code.code_404)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.code_404}<br />` + `${error.data.message}`)
    return { data: [] }
  }
  else if (error.status === 500) {

    //Lỗi từ back-end.
    // notyf.error(BSHAREresource.notification_content.error_status_code.code_500)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.code_500}<br />` + `${error.data.message}`)
  } else {

    //Có lỗi từ máy chủ!'
    // notyf.error(BSHAREresource.notification_content.error_status_code.server_error)
    notyf.error(`${BSHAREresource.notification_content.error_status_code.server_error}<br />` + `${error.data.message}`)
  }
}
