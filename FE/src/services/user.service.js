import { getAPI, postAPI, putAPI } from "./api";
import { BaseService } from "./base/baseService";
const endPoint = 'endpoint'
class UserService extends BaseService {
    constructor() {
        super(endPoint);
    }
    async login({ username, password }) {
        var data = await postAPI('auth/signin', { username, password })
        return data
    }
    //role: [] array string
    async signup({ username, password, role }) {
        var data = await postAPI('auth/signup', { username, password, role })
        return data
    }

    async resendOtp({ username }) {
        var data = await putAPI('auth/getOtp', { username })
        return data
    }
    async confirmEmailByOtp({ username, otp }) {
        var data = await putAPI('auth/otpVerification', { username, otp })
        return data
    }

    /**
     *
     * @param {*} ObjectRating -
     *
     * {"bookId": id, "scoring": Number, "content": “string” }
     * --- --- --------------------------------------
     * {"pdfId": id, "scoring": Number, "content": “string” }

     * @returns message from BE
     */
    async rateBookOrUploadFile(ObjectRating) {
        var data = await postAPI('post', ObjectRating)
        return data
    }

    /**
     * người dùng sử dụng để lấy danh sách top 50 sách
     * @returns
     */
    async get50TopBook() {
        var data = await getAPI('book/top')
        return data
    }

    /**
     * API sử dụng để lấy ra các cuốn sách gợi ý
     * @returns array chứa thông tin các quyển sách gợi ý
     */
    async getRecommendedBooks() {
        var data = await getAPI('book')
        return data
    }

    async getUserByName({ name }) {
        var data = await getAPI(`users/search?name=${name}`)
        return data
    }

    /**
     * API sử dụng lấy tất cả các sách trong mybook
     * @param {*}
     * @returns
     */
    async getAllMyBook() {
        var data = await getAPI(`bookBasket`)
        return data
    }
}

export default new UserService()
