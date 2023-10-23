
/**
 * hàm callback nhận vào arg dạng array chứa text search
 * @param {*} callback
 * @param {*} delay
 * @returns
 */
export const debounce = (callback, delay) => {

  let timeout = null

  return (...args) => {
    console.log(args[0])
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback(args[0])
    }, delay)
  }
}
