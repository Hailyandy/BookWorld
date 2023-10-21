import { postAPI, putAPI } from "./api";
import { BaseService } from "./base/baseService";
const endPoint = 'endpoint'
class AuthService extends BaseService {
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
}

export default new AuthService()
