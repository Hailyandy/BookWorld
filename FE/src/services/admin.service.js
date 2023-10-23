import { BaseService } from "./base/baseService";
import { postAPI, putAPI, getAPI } from "./api";

//Phục vụ cho việc sử dựng base service, cần cung cấp chính xác phần
//url sau /api/...
const endPoint = 'admin'
class AdminService extends BaseService {
    constructor() {
        super(endPoint);

    }
    async searchBookByNameOrAuthor({ name }) {
        var data = await getAPI(`book/${name}`)
        return data
    }

}

export default new AdminService()
