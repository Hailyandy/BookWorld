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

    /**
     * Danh sách tất cả report về cho admin xử lý
     * @param {*} param0
     * @returns
     */
    async getAllReportPdf() {
        var data = await getAPI(`pdf/report`)
        return data
    }

    /**
    * Danh sách tất cả các tác giả
    * @param {*} param0
    * @returns
    */
    async getAllAuthor() {
        var data = await getAPI(`author`)
        return data
    }

    /**
     * Api để lấy danh sách author đang yêu cầu phê duyệt
     * @returns
     */
    async getAllNeedAcceptAccount() {
        var data = await getAPI(`users/author/enable`)
        return data.data
    }


    /**
    * API sử dụng để admin thêm sách mới vào hệ thống
    * @param {*} param0
    *  @returns
    */
    async addNewBook({
        name,
        numberPages,
        publisher,
        publishDate,
        introducing,
        urlPoster,
        authorId,
        genreIds,

    }) {
        var data = await postAPI(`book`, {
            name,
            numberPages,
            publisher,
            publishDate,
            introducing,
            urlPoster,
            authorId,
            genreIds,

        })
        return data
    }
    /**
     * Api để enable tài khoản.
     * @param {*} param0
     * @returns
     */
    async acceptAccount({ authorId }) {
        var data = await postAPI(`users/author/${authorId}/enable`)
        return data
    }

}

export default new AdminService()
