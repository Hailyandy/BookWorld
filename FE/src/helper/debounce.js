import { customRef } from 'vue'

export const useDebounce = (callback, delay) => {

  let timeout = null

  return (() => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback()
    }, delay)
  })
}
