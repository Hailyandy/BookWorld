import { getAPI, patchAPI, postAPI, putAPI, deleteAPI } from "./api";
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
    async signup({ username, password, roles }) {
        var data = await postAPI('auth/signup', { username, password, role: roles })
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

    /**
    *API sử dụng lấy tất cả các bài post
    * @param {*}
    * @returns
    */
    async getAllPost(state = { state: 'PUBLIC' }) {
        var data = await getAPI(`post`, state)
        return data
    }
    /**
    *API sử dụng để lấy ra các cuốn sách gợi ý
    * @param {*}
    * @returns
    */
    async getAllSuggestBook() {
        var data = await getAPI(`book`)
        return data
    }


    /**
     *Api để thêm một bản pdf vào cuốn sách
     * @param {*} param0
     * @returns
     */
    async addPdfForABook({ idBook, urlPdf }) {
        var data = await postAPI('pdf', { idBook, urlPdf })
        return data
    }
    /**
     * Tạo comment
     * @param {*} param0
     * @returns
     */
    async createComment({ content, postId, parentId }) {
        var data = await postAPI('comment', { content, postId, parentId })
        return data
    }

    /**
    * Api để lấy comment của 1 bài post
    @param {} param0
    * @returns
    */
    async getCommentOfPost({ postId }) {
        var data = await getAPI(`comment`, { postId })
        return data
    }

    /**
    * Api để lấy danh sách post của 1 người dùng
    @param {} param0
    * @returns
    */
    async getUserPostList({ userId }) {
        var data = await getAPI(`post/${userId}`)
        return data
    }

    /**
     * Api để lấypost của người dùng hiện tại
     * @returns
     */
    async getCurrentUserPostList() {
        var data = await getAPI(`post/current`)
        return data
    }

    /**
 * API sử dụng để tạo report về bản pdf
 * @param {*} param0
 * @returns
 */
    async createReportAboutPdf({ reason, description, pdf_id }) {
        var data = await postAPI('pdf/report', { reason, description, pdf_id })
        return data
    }
    /**
     * Api để lấy danh sách sách điểm test của 1 người dùng của cuốn sách
     * @param {*} param0
     * @returns
     */
    async getUserTopScoreByBookId({ idBook }) {
        var data = await getAPI(`questions/scoring/top`, { idBook })
        return data
    }
    //----------cbi viet slice---------------------------------------------------------------//
    /**
     * Api để cập nhật bài post
     * @param {*} param0
     * @returns
     */
    async updatePost({ score, content, idPost }) {
        var data = await patchAPI(`post/${idPost}`, { score, content, idPost })
        return data
    }

    /**
     * Api để xóa bài post
     * @param {*} param0
     * @returns
     */
    async deletePost({ idPost }) {
        var data = await deleteAPI(`post/${idPost}`)
        return data
    }
    /**
     * Api để cập nhật sách
     * @param {*} param0
     * @returns
     */
    async updateBookInfo({ idBook }) {
        var data = await patchAPI('book/update', { idBook })
        return data
    }
    /**
     * Api để lấy thông tin của 1 người dùng
     * @param {*} param0
     * @returns
     */
    async getUserInformation({ idUser }) {
        var data = await getAPI(`users/${idUser}`)
        return data
    }
    /**
     * Api để cập nhật thông tin người dùng
     * @param {*} param0
     * @returns
     */
    async updateUserInformation({ idUser }) {
        var data = await patchAPI('users/update', { idUser })
        return data
    }
    /**
     * Api để thống kế số lượng tk theo tháng của năm
     * @param {*} param0 year
     * @returns
     */
    async statistic({ year }) {
        var data = await getAPI(`statistics/new-registrations-by-month/${year}`)
        return data
    }

    async updateUserInfor({
        name,
        phone,
        nativePlace,
        birthDate,
        introducing,
        urlPoster,
        userId
    }) {
        var data = await patchAPI(`users/update/${userId}`, {
            id: userId,
            name,
            phone,
            nativePlace,
            birthDate,
            introducing,
            urlAvatar: urlPoster,
        })
        return data
    }

}

export default new UserService()
