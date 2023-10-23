import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";
const endPoint = 'author'
class AuthorService extends BaseService {
    constructor() {
        super(endPoint);

    }

}

export default new AuthorService()
