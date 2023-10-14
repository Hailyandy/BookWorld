import { ref } from 'vue'

const isLoading = ref(false)

export default function useLoading() {

    function showLoading() {
        isLoading.value = true
    }

    function hideLoading() {
        isLoading.value = false
    }

    return {
        isLoading,
        showLoading,
        hideLoading
    }

}
